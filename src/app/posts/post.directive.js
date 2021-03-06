(function () {
  'use strict';

  angular
    .module('tddWorkshop.posts')
    .component('post', poster());

  function poster() {
    var directive = {
      controller: PostController,
      controllerAs: 'vm',
      templateUrl: '/app/posts/post.html',
      bindings: {
        post: '='
      }
    };
    return directive;
  }

  PostController.$inject = ['users', 'bleets', '$rootScope'];

  function PostController(users, bleets, $rootScope) {
    var vm = this;

    vm.author = {};
    vm.delete = deletePost;

    activate();

    /////////

    function activate() {
      users.getUser(vm.post.author)
        .then(setAuthorDataFromUser);
    }

    function setAuthorDataFromUser(user) {
      vm.author.name = user.fullName;
      vm.author.avatarUrl = user.avatarUrl;
      return user;
    }

    function deletePost() {
      bleets.deleteBleet(vm.post.id).then(
        function(){
          $rootScope.$broadcast('bleetDeleted');
        }
      );
    }

  }

})();

