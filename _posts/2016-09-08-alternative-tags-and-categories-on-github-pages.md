---
title: Alternative Tags And Categories On GitHub Pages Without Plugins
category: programming
tags: [github, github-pages, jekyll]
---

**tl;dr** I found an alternative DRY way to use tags and categories on [GitHub Pages](http://pages.github.com/) without plugins.


Some of you might have read my former [post]({% post_url 2014-08-03-tags-and-categories-on-github-pages %}) in which I explained the use of `_data` and empty templates to simulate a semi-automatic "plugin".

Since then, 2 years have passed and [Jekyll 3.0](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0) has become the new standard on GitHub.

While upgrading all my settings and browsing the documentation, I stumbled upon [Jekyll Collections](https://jekyllrb.com/docs/collections/).

After playing around with this feature for a while, it turned out to be a pretty neat replacement for my previous approach.

---

**How to do that?**

1.  add a collection to your jekyll `_config`:

    ``` yaml
    collections:
      my_categories:
        output: true
        permalink: /blog/category/:name/
    ```

2.  create entries for your new collection (in this case `/my_categories/food.md`)

    ``` yaml
    ---
    layout: default
    slug: food
    name: Food
    whatever: another value
    ---
    ```

3.  profit!

---

**So what happened here?**

Instead of storing all information inside a data file + template I moved them to the front-matters section of their respective collection entry.
A big advantage here is that there is just one place left to store the data.

The magic comes from `output: true` which causes jekyll to generate pages according to their `permalink` value.

---

**How to use them?**

This is basically analog to the previous post method, so it should be easy for you to switch.

1.  add some template logic on top of your __post layout__

    ``` liquid
    {% raw %}{% assign category = site.my_categories | where: "slug", post.category %}
    {% assign category = category[0] %}
    {% if category %}
        {% capture category_content %}<a class="label" href="{{ category.url }}">{{ category.name }}</a>{% endcapture %}
    {% endif %}{% endraw %}
    ```

2.  place the generated tag content wherever you like inside your __post layout__

    ``` html
    <p id="post-meta">{% raw %}{{ category_content }}{% endraw %}</p>
    ```

3.  annotate your __post entry__ front-matter block as usual:

    ``` yaml
    ---
    layout: post
    title: Alternative Tags And Categories On GitHub Pages Without Plugins
    category: programming
    tags: [github, github-pages, jekyll]
    ---
    ```

---

**Final remarks:**

Tags work analog - [check out my repository](https://github.com/minddust/minddust.github.io) for a complete implementation.
