---
layout: default
title: Send Your Message
wrapper: contact-page
image: '/assets/blog/css-grid/future_technology_prospects.png'
---

{% include core/header.html %}

<div class="main-content">
  <div class="page-wrapper {{page.wrapper}}">
    {% include common/top-header.html %}
    <div class="container shadow p-0 mb-5 bg-white position-relative" style="top: -30px;">
        <div class="row">
        <div class="col-12 col-md-6 pt-5 pt-md-0 pb-3 pb-md-0 align-items-center bg-info d-flex justify-content-center">
        <div class="text-center address">
            <div class="socila-media text-center text-md-left mt-4">
                {% include core/social-link.html %}
            </div>
            <p class="small text-center">
                <span>Email: </span>
                <a class="" 
                    href="mailto:kousheralampranto@gmail.com">
                    kousheralampranto@gmail.com
                </a>
            </p>
        </div>
    </div>
    <div class="col-12 col-md-6 bg-primary p-3 text-white">
        <form class="pt-5 pb-5" action="https://getform.io/f/1065200e-8bc0-4626-b6fa-c05f418d9ddf" method="POST">
            <div class="form-group">
                <label for="your-name">Name</label>
                <input name="name" type="text" class="form-control" id="your-name" placeholder="Name">
            </div>
            <div class="form-group">
                <label for="message-subject">Subject</label>
                <input name="subject" type="text" class="form-control" id="message-subject" placeholder="Subject">
            </div>
            <div class="form-group">
                <label for="yourEmail">Email address</label>
                <input name="email" type="email" class="form-control" id="yourEmail" aria-describedby="emailHelp" placeholder="example@email.com">
                <small id="emailHelp" class="form-text text-warning">
                    We'll never share your email with anyone else.
                </small>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea name="message" class="form-control" id="message" placeholder="Write Your Message"></textarea>
            </div>
            <div class="text-right">
                <button type="submit" class="btn btn-success pl-5 pr-5">Send Message</button>
            </div>
        </form>
    </div>
</div>
      </div>
    </div>
</div>

{% include core/footer.html %}

