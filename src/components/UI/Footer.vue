<template>
    <div class="footer">
      <div class="content">
        <div class="about">
          <h1>cyber</h1>
          <p>
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p>
        </div>
  
        <div class="menu">
          <h2>Services</h2>
          <ul>
            <li>Bonus program</li>
            <li>Gift cards</li>
            <li>Credit and payment</li>
            <li>Service contracts</li>
            <li>Non-cash account</li>
            <li>Payment</li>
          </ul>
        </div>

        <div class="help">
          <h2>Assistance to the buyer</h2>
          <ul>
            <li>Find an order</li>
            <li>Terms of delivery</li>
            <li>Exchange and return of goods</li>
            <li>Guarantee</li>
            <li>Frequently asked questions</li>
            <li>Terms of use of the site</li>
          </ul>
        </div>
      </div>
  
      <div class="social">
        <a href="#"><img src="/src/assets/footer/Twitter.png" alt=""></a>
        <a href="#"><img src="/src/assets/footer/Facebook.png" alt=""></a>
        <a href="#"><img src="/src/assets/footer/TikTok.png" alt=""></a>
        <a href="#"><img src="/src/assets/footer/Instagram.png" alt=""></a>
      </div>
    </div>
  </template>
  
  <style scoped>
  .footer {
    font-family: Arial, sans-serif;
    background-color: #000000;
    color: #ffffff;
    padding: 40px;
    min-height: 504px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    margin-top: 150px;
  }
  
  .about,
  .menu,
  .help {
    flex: 1;
    margin-right: 40px;
  }
  
  .about {
    max-width: 384px;
  }
  
  .menu,
  .help {
    max-width: 200px;
  }
  
  .about p {
    line-height: 1.6;
    margin-top: 20px;
    color: #CFCFCF;
  }
  
  h1 {
    font-size: 2em;
    text-transform: lowercase;
    margin-bottom: 20px;
    font-weight: normal;
    color: #fff;
  }
  
  h2 {
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: normal;
    color: #fff;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
  }
  
  li {
    margin-bottom: 12px;
    font-size: 0.9em;
    line-height: 1.5;
    color: #CFCFCF;
  }
  
  .social {
    display: flex;
    gap: 20px;
    margin-left: 310px;
    margin-bottom: 150px;
  }
  
  .social a {
    color: #ffffff;
    font-size: 1.2em;
    text-decoration: none;
  }
  
  .social a:hover {
    color: #cccccc;
  }


  </style>