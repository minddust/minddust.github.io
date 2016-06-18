---
title: Articles
subtitle: Much Read! So Wow!
---

{% if paginator.posts %}
  {% for post in paginator.posts %}
    {% assign category = site.my_categories | where: "slug", post.category %}
    {% assign category = category[0] %}

    <div class="card m-b-2">
      <div class="card-block">
        <h3 class="card-title">{{ post.title }}</h3>
        <div class="card-text">{{ post.excerpt }}<p class="m-b-0">&#8230</p></div>
      </div>
      <div class="card-footer clearfix">
        <small class="pull-xs-left text-muted">Posted <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b. %d, %Y' }}</time> in&nbsp;</small>
        <a class="pull-xs-left label" href="{{ category.url }}" style="background-color:{{ category.color }}">{{ category.name }}</a>
        <small><a class="pull-xs-right" href="{{ post.url }}">Read more</a></small>
      </div>
    </div>
  {% endfor %}
{% else %}
  <p>No posts found.</p>
{% endif %}

{% if paginator.total_pages > 1 %}
  <div class="text-xs-center">
    <ul class="pagination pagination-sm">
      <li class="page-item{% unless paginator.previous_page %} disabled{% endunless %}">
        <a class="page-link" href="{% if paginator.previous_page == 1 %}/blog/{% else %}{{ paginator.previous_page_path }}{% endif %}" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      {% for page in (1..paginator.total_pages) %}
        {% if page == paginator.page %}
          <li class="page-item active"><a class="page-link" href="#">{{ page }} <span class="sr-only">(current)</span></a></li>
        {% elsif page == 1 %}
          <li class="page-item"><a class="page-link" href="/blog/">1</a></li>
        {% else %}
          <li class="page-item"><a class="page-link" href="{{ site.paginate_path | replace: ':num', page }}">{{ page }}</a></li>
        {% endif %}
      {% endfor %}
      <li class="page-item{% unless paginator.next_page %} disabled{% endunless %}">
        <a class="page-link" href="{% if paginator.next_page %}{{ paginator.next_page_path }}{% else %}#{% endif %}" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </div>
{% endif %}
