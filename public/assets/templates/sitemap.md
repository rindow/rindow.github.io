---
layout: page
title: "Sitemap"
permalink: /sitemap/
---

{% for p in site.pages %}
  {% if p.title and p != page and p.url != "/404" and p.url != "/404.html" %}* [{{ p.title }}]({% include get-relative-url url=p.url %}){% endif %}
{% endfor %}
{% for collection in site.collections %}{% if collection.label != "posts" %}
  {% if collection.output and collection.title %}* [{{ collection.title }}]({{ collection.label | append: "/" | prepend: "/" | relative_url }}){% endif %}
{% endif %}{% endfor %}
