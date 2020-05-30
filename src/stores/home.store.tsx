import {Post, getPosts} from '../apis/posts.api';
import {action, observable} from 'mobx';

export default class HomeStore {
  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @observable loading: boolean = false;

  @action getPosts = async () => {
    this.loading = true;
    try {
      const posts = await getPosts();
      this.posts = posts;
    } catch (error) {
      this.posts = [];
      throw error;
    } finally {
      this.loading = false;
    }
  };

  @action addPost = (uriPhoto: string) => {
    const post: Post = {
      author: {
        id: 1,
        name: 'alexfelipebarbosa',
        avatar:
          'https://avatars3.githubusercontent.com/u/12144620?s=460&u=b9785347e44440d8a08fbbaf61a72288c05671e0&v=4',
      },
      authorId: 1,
      description: 'irado',
      id: this.posts.length + 1,
      image: uriPhoto,
    };

    this.posts.unshift(post);
  };

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  };
}

const homeStore = new HomeStore();
export {homeStore};
