---
category: programming
tags: [django, django-template-tags, python]
---

I'm using Django's [spaceless](https://docs.djangoproject.com/en/dev/ref/templates/builtins/#spaceless) template-tag a lot, but after adding some code inside a `pre` tag I recognised that everything left is a squeezed string. I never came up with that problem before. The builtin spaceless tag is doing just fine. So after a little bit of searching I quickly found some resources about that topic:


<https://code.djangoproject.com/ticket/15798>

<http://www.mail-archive.com/django-developers@googlegroups.com/msg09235.html>

Summary:

*   not possible with builtin methods
*   not coming with future versions

It was my fault to expect something different from a tag which does exactly what it should.

But this doesn't matter - let's build a new template tag that does the trick! :)

``` python
"""Copyright (c) 2013-2014 Stephan Groß, under MIT license."""
from __future__ import unicode_literals

import re

from django import template
from django.template import Node
from django.utils import six
from django.utils.encoding import force_text
from django.utils.functional import allow_lazy


register = template.Library()


def strip_spaces_between_tags_except_pre(value):
    def replacement(count, matches, match):
        matches.append(match.group(0)[1:-1])  # save the whole match without leading "<" and trailing ">"
        count[0] += 1
        return '<{{{0}}}>'.format(count[0])  # add "<" and ">" to preserve space stripping
    count = [-1]
    matches = []
    value = re.sub(r'<pre(\s.*)?>(.*?)</pre>', lambda match: replacement(count, matches, match), force_text(value), flags=re.S | re.M | re.I)
    value = re.sub(r'>\s+<', '><', force_text(value))
    return value.format(*matches)
strip_spaces_between_tags_except_pre = allow_lazy(strip_spaces_between_tags_except_pre, six.text_type)


class SpacelessExceptPreNode(Node):
    def __init__(self, nodelist):
        self.nodelist = nodelist

    def render(self, context):
        return strip_spaces_between_tags_except_pre(self.nodelist.render(context).strip())


@register.tag
def spaceless_except_pre(parser, token):
    """Remove whitespace between HTML tags, including tab and newline characters except content between <pre>"""
    nodelist = parser.parse(('endspaceless_except_pre',))
    parser.delete_first_token()
    return SpacelessExceptPreNode(nodelist)
```

also available as [Gist](https://gist.github.com/minddust/8196664).

Just put this snippet in a new file (like `spaceless_except_pre.py`) inside your `templatetags` folder.

Now you can load and apply this tag inside your template like:

``` html
{% raw %}{% load spaceless_except_pre %}{% spaceless_except_pre %}
<html>
<body>
    <div class="codehilite">
        <pre>
            <code><span class="k">def</span> <span class="nf">hello</span><span class="p">():</span>
    <span class="k">print</span> <span class="s">&quot;world&quot;</span>
            </code>
        </pre>
    </div>
</body>
</html>
{% endspaceless_except_pre %}{% endraw %}
```

which will result in:

``` html
<html><body><div class="codehilite"><pre><code><span class="k">def</span> <span class="nf">hello</span><span class="p">():</span>
    <span class="k">print</span> <span class="s">&quot;world&quot;</span>
</code></pre></div></body></html>
```

and frontend:

``` python
def hello():
    print "world"
```

You could also take a look at the source of this post for a bigger example.

For those of you who like digging deeper, I simply matched all `<pre>..</pre>` blocks and call a `replacement` method. Inside that method I:

*   append the original content to a list.
*   increment a counter
*   replace the matched pre block content with a placeholder

The trick is that the replaced content with the individual id fits the python string [format](http://docs.python.org/2/library/stdtypes.html#str.format) method syntax. So after stripping out all whitespaces between the tags I call format and pass my filled matched list.

And that's it. Thank you for reading.

---

**Updates** (Jan. 1, 2014):

*   Improved script to save complete original expression and ignore cases.
*   Fix example to use highlighted code (which causes the troubles)

P.S.: Plain text is doing just fine with the default spaceless tag cause it isn't affected by the strip regex.
