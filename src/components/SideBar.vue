
  <template>
    <aside class="main-sidebar">
      <!-- sidebar-->
      <section class="sidebar position-relative">
        <div class="multinav">
          <div class="multinav-scroll" style="height: 100%">
            <!-- sidebar menu-->
            <ul class="sidebar-menu" data-widget="tree">

              <li>
                <router-link :to="{ name: 'Login'}">
                  <i class="fa fa-sign-in"></i>
                  <span>Login</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Register'}">
                  <i class="fa fa-user-plus"></i>
                  <span>Register</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Investments'}">
                  <i class="fa fa-envelope-open-o"></i>
                  <span>Forgot Password</span>
                </router-link>
              </li>

            </ul>
            
          </div>
        </div>
      </section>
    </aside>
</template>
  <script>
  export default {
    name: "SideBar",
  };
  </script>
    