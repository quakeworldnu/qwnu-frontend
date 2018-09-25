<template>
  <div class="ml-3 mb-2 rounded-top rounded-bottom main-container">
    <div class="py-1 px-2 box-header rounded-top">News</div>
    <div class="p-2 pb-0 box-body rounded-bottom">
      <div class="p-2 box-content rounded-top rounded-bottom">
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/AuthService';

export default {
  name: 'home',
  components: {
  },
  mounted() {
    AuthService.getUsers().then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  },
};
</script>
