<template>
  <!-- <div id="loader"></div> -->

  <header class="main-header">
    <div class="d-flex align-items-center logo-box justify-content-start">
      <!-- Logo -->
      <a href="index.html" class="logo">
        <!-- logo-->
        <div class="logo-mini w-30">
          <span class="light-logo"
            ><img src="images/logo-letter.png" alt="logo"
          /></span>
          <span class="dark-logo"
            ><img src="images/logo-letter.png" alt="logo"
          /></span>
        </div>
        <div class="logo-lg">
          <span class="light-logo"
            ><img src="images/logo-dark-text.png" alt="logo"
          /></span>
          <span class="dark-logo"
            ><img src="images/logo-light-text.png" alt="logo"
          /></span>
        </div>
      </a>
    </div>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <div class="app-menu">
        <ul class="header-megamenu nav">
          <li class="btn-group nav-item">
            <a
              href="#"
              class="
                waves-effect waves-light
                nav-link
                push-btn
                btn-primary-light
              "
              data-toggle="push-menu"
              role="button"
            >
              <i class="fa fa-bars"></i>
            </a>
          </li>
        </ul>
      </div>

      <div class="navbar-custom-menu r-side">
        <ul class="nav navbar-nav">
          <!-- Control Sidebar Toggle Button -->
 

        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      
    };
  }
};
</script>
  