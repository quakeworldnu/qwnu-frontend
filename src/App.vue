<template>
    <div id="app">
        <div class="container">
            <div class="col-md-12 p-2 header-background">
                <div class=" p-2 container logo-container">
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
                            <router-link class="nav-link" to="/">News</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Blogs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/forums">Forum</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Maps</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Wiki</a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/register">Register</router-link>
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
                        <input  class="form-control form-control-sm mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search" />
                        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">
                            Search
                        </button>
                        </form>
                        -->
                    </div>
                    </nav>
                </div>
            </div>
            
            <div class="row m-0">
            <div class="col-md-9 m-0 p-0 pt-2 column-body">
                <router-view></router-view>
            </div>
            <div class="col-md-3 m-0 p-0 pt-2 column-body">
                <div class="col-md-12">
                    <side-box-logged-in v-if="$isLoggedIn"></side-box-logged-in>
                    <side-box-login v-else></side-box-login>

                    <side-box-streams></side-box-streams>

                    <side-box-latest-comments></side-box-latest-comments>

                    <div class="mb-2 rounded-top rounded-bottom">
                        <div class="py-1 px-2 box-header rounded-top">
                            <i class="fas fa-book-open m-1"></i>
                            Latest blog posts
                        </div>
                        <div class="pt-2 pr-2 pl-2 pb-0 box-body rounded-bottom">
                            <div class="p-2 box-content rounded-top rounded-bottom">
                                Text
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>

            <footer class="row m-0">
                <div class="col-md-2 section mx-auto my-auto text-center border-0">
                    <img src="./assets/logo-bottom.png"/>
                </div>
                <div class="col-md-2 section">
                    <span class="section-header">Get the game</span>
                    <ul>
                        <li><a href="http://www.nquake.com">nQuake</a></li>
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
                        <li><a href="https://discord.quake.world">Discord chat</a></li>
                        <li><a href="https://www.facebook.com/quakeworld">Facebook</a></li>
                        <li><a href="https://twitter.com/qw_tips">Twitter</a></li>
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
<script>
import { mapActions, mapGetters } from 'vuex';
import SideBoxLogin from './components/SideBoxLogin';
import SideBoxLoggedIn from './components/SideBoxLoggedIn';
import SideBoxStreams from './components/SideBoxStreams';
import SideBoxLatestComments from './components/SideBoxLatestComments';

export default {
    components: {
        SideBoxLoggedIn,
        SideBoxLogin,
        SideBoxStreams,
        SideBoxLatestComments
    },
    computed: {
        ...mapGetters({
            $isLoggedIn: 'isLoggedIn',
            $currentUser: 'user'
        })
    }
}
</script>
<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "stylesheets/app.scss"
</style>
