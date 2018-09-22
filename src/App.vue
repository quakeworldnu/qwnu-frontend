<template>
  <div id="app">
    <div class="container">

        <div class="col-md-12 p-2 text-left logo-background">
          <div class="container p-2 rounded" style="background: rgba(0,0,0,0.2)">
            <div class="mb-2">
              <a href=""><img src="./assets/logo.gif" class="logo"/></a>
            </div>
            <nav class="navbar navbar-expand-lg">
              <!-- <a class="navbar-brand" href="#">Navbar</a> -->
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <!-- <span class="navbar-toggler-icon"></span> -->
                <i class="fa fa-bars float-left m-1"></i>
                QuakeWorld.nu
              </button>

              <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">News <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Blogs</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Forum</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Maps</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Game content
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <a class="dropdown-item" href="#">Configs</a>
                      <a class="dropdown-item" href="#">Graphics</a>
                      <a class="dropdown-item" href="#">Maps</a>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Media</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Site</a>
                  </li>
                </ul>
                <!--
                <form class="form-inline">
                  <input class="form-control form-control-sm mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                </form>
                -->
              </div>
            </nav>
          </div>
        </div>

        <div class="row m-0">
          <div class="col-md-9 m-0 p-0 pt-2 column-body">
            <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
              <div class="py-1 px-2 box-header rounded-top">News</div>
              <div class="pt-2 pr-2 pl-2 pb-0 box-body rounded-bottom">
                <div class="p-2 box-content content bg-light rounded-top rounded-bottom">
                  <h1><a href="">Lorem ipsum dolor sit amet</a></h1>
                  <span class="box-content-info">Åke Vader / 22nd September 2018, 15:50</span>
                  <div class="box-content-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere elit et neque malesuada dapibus. Mauris a vehicula diam. Morbi pretium diam lectus, in efficitur purus vehicula at. Nullam tellus nisi, aliquam quis lorem sed, aliquam vehicula nunc. Nulla non purus tellus. In hac habitasse platea dictumst. Praesent id ante faucibus elit blandit pharetra vel auctor felis. Sed pretium consequat dignissim. Mauris efficitur magna lorem, eget molestie nulla tempor ut. Vestibulum ac luctus dui. Donec arcu ligula, finibus ut arcu eu, semper hendrerit diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec bibendum suscipit varius. Vivamus vulputate arcu eget nibh congue, in tempor diam vehicula. Nam ac neque sem. Sed in ipsum vel velit eleifend tristique.
                    <br/><br/>
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam sodales, tellus nec efficitur ultrices, sem mi varius purus, vitae dictum urna nisi quis enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis in est quis felis malesuada dapibus. Nam est nibh, egestas eget magna sit amet, congue euismod leo. Nulla porta metus vitae nunc volutpat euismod. Vestibulum pellentesque dignissim tincidunt. Mauris quis lacus tellus. Vestibulum accumsan tortor vel aliquam volutpat. In rhoncus sem et tempor vulputate. Cras mi urna, maximus vel suscipit id, consequat ut ligula.
                  </div>
                  <div class="box-content-footer">
                    <i class="fas fa-comments mr-2"></i>
                    <a href="">7</a>
                    <div class="float-right">
                      <i class="fas fa-pen mr-2"></i> 
                      <i class="fas fa-trash"></i>
                    </div>
                  </div>
                </div>
                <div class="p-2 box-content content bg-light rounded-top rounded-bottom">
                  <h1><a href="">Lorem ipsum dolor sit amet</a></h1>
                  <span class="box-content-info">Åke Vader / 22nd September 2018, 15:50</span>
                  <div class="box-content-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere elit et neque malesuada dapibus. Mauris a vehicula diam. Morbi pretium diam lectus, in efficitur purus vehicula at. Nullam tellus nisi, aliquam quis lorem sed, aliquam vehicula nunc. Nulla non purus tellus. In hac habitasse platea dictumst. Praesent id ante faucibus elit blandit pharetra vel auctor felis. Sed pretium consequat dignissim. Mauris efficitur magna lorem, eget molestie nulla tempor ut. Vestibulum ac luctus dui. Donec arcu ligula, finibus ut arcu eu, semper hendrerit diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec bibendum suscipit varius. Vivamus vulputate arcu eget nibh congue, in tempor diam vehicula. Nam ac neque sem. Sed in ipsum vel velit eleifend tristique.
                    <br/><br/>
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam sodales, tellus nec efficitur ultrices, sem mi varius purus, vitae dictum urna nisi quis enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis in est quis felis malesuada dapibus. Nam est nibh, egestas eget magna sit amet, congue euismod leo. Nulla porta metus vitae nunc volutpat euismod. Vestibulum pellentesque dignissim tincidunt. Mauris quis lacus tellus. Vestibulum accumsan tortor vel aliquam volutpat. In rhoncus sem et tempor vulputate. Cras mi urna, maximus vel suscipit id, consequat ut ligula.
                  </div>
                  <div class="box-content-footer">
                    <i class="fas fa-comments mr-2"></i>
                    <a href="">4</a>
                    <div class="float-right">
                      <i class="fas fa-pen mr-2"></i>
                      <i class="fas fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--
            <div class="col-md-12">
              <div class="py-2 mt-2 bg-light">
                <div>Header</div>
                <div>Text</div>
              </div>
            </div>
            -->
          </div>
          <div class="col-md-3 m-0 p-0 pt-2 column-body">
            <div class="col-md-12">

              <div class="mb-2 rounded-top rounded-bottom">
                <div class="py-1 px-2 box-header rounded-top">
                  <i class="fas fa-key m-1"></i>
                  Login
                </div>
                <div class="pt-2 pr-2 pl-2 pb-0 box-body rounded-bottom">
                  <div class="p-2 box-content content bg-light rounded-top rounded-bottom">
                    <!-- Login box -->
                    <form>
                      <div class="form-group mb-0">
                        <input type="text" class="form-control form-control-sm mt-1" placeholder="username"/>
                        <input type="password" class="form-control form-control-sm mt-1" placeholder="password"/>
                        <button type="submit" class="btn btn-dark btn-sm bg-dark mt-2">Login</button>
                        <div class="mt-1">
                          <a href="">Register</a> | 
                          <a href="">Forgot password</a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="mb-2 rounded-top rounded-bottom">
                <div class="py-1 px-2 box-header rounded-top">
                  <i class="fas fa-video m-1"></i>
                  Streams
                </div>
                <div class="pt-2 pr-2 pl-2 pb-0 box-body rounded-bottom">
                  <div class="p-2 box-content content bg-light rounded-top rounded-bottom">
                    Text
                  </div>
                </div>
              </div>

              <div class="mb-2 rounded-top rounded-bottom">
                <div class="py-1 px-2 box-header rounded-top">
                  <i class="fas fa-comments m-1"></i>
                  Forum activity
                </div>
                <div class="pt-2 pr-2 pl-2 pb-0 box-body rounded-bottom">
                  <div class="mb-2">
                    <div class="box-content-record">
                      Odd ezuake restrictions
                      <span class="box-content-record-info">2 hours ago in client talk</span>
                      <span class="box-content-record-author">By povohat</span>
                    </div>
                    <div class="box-content-record">
                      QW Duel Showdown 2018 - online duel tournament with prize...
                      <span class="box-content-record-info">2 days ago in General Discussion</span>
                      <span class="box-content-record-author">By lordlame</span>
                    </div>
                    <div class="box-content-record">
                      Deathmatch TV - Russia
                      <span class="box-content-record-info">2 days ago in LAN tournaments</span>
                      <span class="box-content-record-author">By Hooraytio</span>
                    </div>
                    <div class="box-content-record">
                      QW Duel Showdown 2018 - online duel tournament with prize...
                      <span class="box-content-record-info">1 week ago in General Discussion</span>
                      <span class="box-content-record-author">By Bps</span>
                    </div>
                    <div class="box-content-record">
                      QuakeWorld votecoop mode error
                      <span class="box-content-record-info">2 weeks ago in General Discussion</span>
                      <span class="box-content-record-author">By Rasta</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-2 rounded-top rounded-bottom">
                <div class="py-1 px-2 box-header rounded-top">
                  <i class="fas fa-book-open m-1"></i>
                  Latest blog posts
                </div>
                <div class="pt-2 pr-2 pl-2 pb-0 box-body rounded-bottom">
                  <div class="p-2 box-content content bg-light rounded-top rounded-bottom">
                    Text
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <footer class="footer row m-0">
            <div class="col-md-2 section mx-auto my-auto text-center border-0">
              <img src="./assets/logo-bottom.png"/>
            </div>
            <div class="col-md-2 section">
              <span class="section-header">RSS Feeds</span>
              <ul>
                <li><a href="#">News</a></li>
                <li><a href="#">Blogs</a></li>
              </ul>
            </div>
            <div class="col-md-2 section">
              <span class="section-header">Sections</span>
              <ul>
                <li><a href="#">News</a></li>
                <li><a href="#">Blogs</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">Forum</a></li>
                <li><a href="#">Media</a></li>
              </ul>
            </div>
            <div class="col-md-2 section">
              <span class="section-header">Social Media</span>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">YouTube</a></li>
                <li><a href="#">own3D.tv</a></li>
                <li><a href="#">IRC chat</a></li>
              </ul>
            </div>
            <div class="col-md-2 section">
              <span class="section-header">Media</span>
              <ul>
                <li><a href="#">Images</a></li>
                <li><a href="#">Video</a></li>
                <li><a href="#">Game content</a></li>
              </ul>
            </div>
            <div class="col-md-2 section">
              <span class="section-header">Information</span>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Site media</a></li>
                <li><a href="#">Staff & credits</a></li>
              </ul>
            </div>
        </footer>
    </div>

  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.logo-background {
//background-image: url('./assets/bg-header.png');
background-image: url('./assets/bg-footer.jpg');
}
.logo {
  @media (max-width: 768px) { 
    display: none;
   }
  
}

.box-header {
  color: rgb(219, 175, 117);
  font-size: 0.7em;
  text-align: left;
  text-transform: uppercase; 
  background-image: url("./assets/bg-box-header.png"); // Using #45372d and "White Plaster" filter
  border-style: solid;
  border-width: 1px;
  border-color: rgb(112, 77, 44) rgb(51, 51, 51) rgb(51, 51, 51) rgb(112, 77, 44);
}
.box-body {
  font-size: 0.7em;
  background-image: url("./assets/bg-box-body.png"); // Using #614b3c and "White Plaster" filter
  border-style: solid;
  border-width: 1px;
  border-color: rgb(143, 98, 56) rgb(51, 51, 51) rgb(51, 51, 51) rgb(143, 98, 56);
}

.box-body a {
  color: #d14e0c;
}

.box-content {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.box-content h1 {
  font-size: 1.5em;
}

.box-content-info {
  clear: both;
  font-size: 0.8em;
  display: block;
  margin-bottom: 1em;
}

.box-content-body {
  margin-bottom: 10px;
}

.box-content-record {
  background-image: url("./assets/bg-box-record.png"); // Using #8a8167 and "White plaster" filter
  border-style: solid;
  border-width: 1px;
  border-color: #ada281 #6b6450 #6b6450 #ada281;
  padding: 10px;
  color: #fffcda;
  font-weight: bold;
  font-size: 1.1em;
}

.box-content-record-info {
  color: #f3eda9;
  font-weight: normal;
  font-size: 0.9em;
  clear: both;
  display: block;
}

.box-content-record-author {
  color: #c2bc81;
  font-weight: normal;
  font-size: 0.9em;
  clear: both;
  display: block;
}

.box-content-footer {
  padding: 10px;
  background-color: #e7e7e7;
}

.box-content h1 a {
  color: inherit;
}

.column-body {
  background-color: rgb(182, 59, 59);
  //background-image: url("./assets/bg-container.png");
  background-image: url("./assets/block-bgr-mid.gif");
}

footer {
  background-image: url("./assets/bg-footer.jpg");
  font-size: 0.8em;
  padding: 1em;
}

footer .section {
  border-left: 1px dotted grey;
}

footer .section-header {
  color:#a17230;
  text-transform: uppercase;
  font-size: 0.9em;
}

footer a {
  color: #888888;
}

footer a:hover {
  color: #ccc;
  text-decoration: underline;
}

footer ul {
  list-style: none;
  padding: 0;
  font-size: 0.8em;
}

.dropdown-menu {
  background-image: url("./assets/bg-header-menu.png"); // Using #ad4c1c and "White plaster" filter
  padding: 0;
  margin: 0;
}

.navbar {
  background-image: url("./assets/bg-header-menu.png"); // Using #ad4c1c and "White plaster" filter
  border-style: solid none;
  border-width: 1px;
  border-color: #ce5b22 #ce5b22 #000 #000;
  padding: 0;
  @media (max-width: 768px) {
    border: none;
  }
}

.navbar-toggler {
  width: 100%;
  border-style: solid solid solid solid;
  border-width: 1px;
  border-color: #ce5b22 #ce5b22 rgb(116, 74, 20) rgb(116, 74, 20);
  color: #f5f5f5;
}

.navbar ul {
    border-right: 1px solid rgb(116, 74, 20);
}

.nav-item, {
  display: block;
  //border: 1px solid #000;
  margin: 0;
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: bold;
  border-style: none solid;
  border-width: 1px;
  border-color: #ce5b22 #ce5b22 rgb(116, 74, 20) rgb(116, 74, 20);
}

.dropdown-item {
  display: block;
  //border: 1px solid #000;
  margin: 0;
  padding: 0.5em 1em;
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: bold;
  border-style: solid none;
  border-width: 1px;
  border-color: #ce5b22 #ce5b22 rgb(116, 74, 20) rgb(116, 74, 20);
  color: #f5f5f5;
}

.nav-item .nav-link {
  color: #f5f5f5;

  @media (max-width: 991.98px) {
    padding: 10px;
    border-style: solid none;
    border-width: 1px;
    border-color: #ce5b22 #ce5b22 rgb(116, 74, 20) rgb(116, 74, 20);
  }
}

.nav-item:hover, .dropdown-item:hover {
    background-color: rgba(179, 115, 43, 0.5);
    border-color: rgb(190, 123, 46) rgb(190, 123, 46) rgb(116, 74, 20) rgb(116, 74, 20);
    color: #fff;
}

.main-container {
  @media (max-width: 768px) { 
    margin-right: 1em;
  }
}
</style>
