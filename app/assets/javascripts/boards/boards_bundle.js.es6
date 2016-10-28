/* eslint-disable */
//= require vue
//= require vue-resource
//= require Sortable
//= require_tree ./models
//= require_tree ./stores
//= require_tree ./services
//= require_tree ./mixins
//= require_tree ./filters
//= require ./components/board
<<<<<<< HEAD
//= require ./components/boards_selector
=======
//= require ./components/board_sidebar
>>>>>>> 144358e98ee1b25b61854a3471e21e100ace9db5
//= require ./components/new_list_dropdown
//= require ./vue_resource_interceptor

$(() => {
  const $boardApp = document.getElementById('board-app'),
        Store = gl.issueBoards.BoardsStore;

  window.gl = window.gl || {};

  if (gl.IssueBoardsApp) {
    gl.IssueBoardsApp.$destroy(true);
  }

  gl.IssueBoardsApp = new Vue({
    el: $boardApp,
    components: {
      'board': gl.issueBoards.Board,
<<<<<<< HEAD
      'boards-selector': gl.issueBoards.BoardsSelector
=======
      'board-sidebar': gl.issueBoards.BoardSidebar
>>>>>>> 144358e98ee1b25b61854a3471e21e100ace9db5
    },
    data: {
      state: Store.state,
      loading: true,
      endpoint: $boardApp.dataset.endpoint,
      boardId: $boardApp.dataset.boardId,
      disabled: $boardApp.dataset.disabled === 'true',
      issueLinkBase: $boardApp.dataset.issueLinkBase,
      detailIssue: Store.detail
    },
    init: Store.create.bind(Store),
    computed: {
      detailIssueVisible () {
        return Object.keys(this.detailIssue.issue).length;
      }
    },
    created () {
      gl.boardService = new BoardService(this.endpoint, this.boardId);
    },
    ready () {
      Store.disabled = this.disabled;
      gl.boardService.all()
        .then((resp) => {
          resp.json().forEach((board) => {
            const list = Store.addList(board);

            if (list.type === 'done') {
              list.position = Infinity;
            } else if (list.type === 'backlog') {
              list.position = -1;
            }
          });

          Store.addBlankState();
          this.loading = false;
        });
    }
  });

  gl.IssueBoardsSearch = new Vue({
    el: '#js-boards-seach',
    data: {
      filters: Store.state.filters
    }
  });
});
