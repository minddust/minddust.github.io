---
title: How To Use Tags And Categories On GitHub Pages Without Plugins
category: programming
tags: [github, github-pages, jekyll]
---

[GitHub Pages](http://pages.github.com/) service is just awesome!

And with the jekyll integration it even get’s more awesome! :D

But there are some limitations of this big automated system:

*  no own plugins
*  [limited available plugins](https://pages.github.com/versions/)

As you may know:

*  no tag / category plugins are (currently) available.

Sad.. But that was something I really wanted to have!

So I built my own Data-Template-NoPlugin-System and it works.


You can see a live demo on this page.

Here is a little guide how to implement it yourself:

1.  add some template logic on top of your __post layout__

    ``` liquid
    {% raw %}{% assign post = page %}
    {% if post.tags.size > 0 %}
        {% capture tags_content %}Posted with {% if post.tags.size == 1 %}<i class="fa fa-tag"></i>{% else %}<i class="fa fa-tags"></i>{% endif %}: {% endcapture %}
        {% for post_tag in post.tags %}
            {% for data_tag in site.data.tags %}
                {% if data_tag.slug == post_tag %}
                    {% assign tag = data_tag %}
                {% endif %}
            {% endfor %}
            {% if tag %}
                {% capture tags_content_temp %}{{ tags_content }}<a href="/blog/tag/{{ tag.slug }}/">{{ tag.name }}</a>{% if forloop.last == false %}, {% endif %}{% endcapture %}
                {% assign tags_content = tags_content_temp %}
            {% endif %}
        {% endfor %}
    {% else %}
        {% assign tags_content = '' %}
    {% endif %}{% endraw %}
    ```

2.  place the generated tag content wherever you like inside your __post layout__

    ``` html
    <p id="post-meta">{% raw %}{{ tags_content }}{% endraw %}</p>
    ```

3.  create a __blog\_by\_tag__ layout

    ``` html
    <h1>Articles by tag :{% raw %}{{ page.tag }}{% endraw %}</h1>
    <div>
        {% raw %}{% if site.tags[page.tag] %}
            {% for post in site.tags[page.tag] %}{% endraw %}
                <a href="{% raw %}{{ post.url }}{% endraw %}/">{% raw %}{{ post.title }}{% endraw %}</a>
            {% raw %}{% endfor %}
        {% else %}{% endraw %}
            <p>There are no posts for this tag.</p>
        {% raw %}{% endif %}{% endraw %}
    </div>
    ```

4.  annotate your __post entry__ front-matter block as usual:

    ``` yaml
    ---
    layout: post
    title: How To Use Tags And Categories On GitHub Pages Without Plugins
    category: programming
    tags: [github, github-pages, jekyll]
    ---
    ```

5.  for every used tag you have to add an entry inside your __\_data/tags.yml__

    ``` yaml
    - slug: github-pages
      name: GitHub Pages
    ```

6.  for every used tag you have to add an empty template - e.g. __blog/tag/github-pages.md__

    ``` yaml
    ---
    layout: blog_by_tag
    tag: github-pages
    permalink: /blog/tag/github-pages/
    ---
    ```

For a more complex implementation and categories: [check out my repository](https://github.com/minddust/minddust.github.io)

---

**Updates** (Feb. 12, 2015):

*  Added missing `{% raw %}{% assign post = page %}{% endraw %}` (thanks [Christopher Rodriguez](https://github.com/cdr255))

**Updates** (Apr. 4, 2015):

*  Switched to absolute permalinks (which is forced by jekyll 2.0+)

**Updates** (June 14, 2015):

*   [Róbert Papp](https://github.com/TWiStErRob) suggested ([here](https://github.com/minddust/minddust.github.io/issues/5)) a restructuring of the data content so you can simplify the lookups. Thanks!

    *   **before**

        ``` yaml
        - slug: github-pages
          name: GitHub Pages
        ```

        ``` liquid
        {% raw %}{% for post_tag in post.tags %}
            {% for data_tag in site.data.tags %}
                {% if data_tag.slug == post_tag %}
                    {% assign tag = data_tag %}{% endraw %}
        ```

    *   **after**

        ``` yaml
        github-pages:
          name: GitHub Pages
        ```

        ``` liquid
        {% raw %}{% for post_tag in post.tags %}
            {% assign tag = site.data.tags[post_tag] %}{% endraw %}
        ```

**Updates** (May 18, 2016):

*   Switched [my repository](https://github.com/minddust/minddust.github.io) to [Róbert Papp](https://github.com/TWiStErRob) simpler version. (see above)
