import {action, observable} from 'mobx';

import axios from 'axios';

type Post = {
  id: number;
  image: string;
  description: string;
  authorId: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
};

export default class HomeStore {
  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @action getPosts = async () => {
    try {
      const {data: posts} = await axios.get<[Post]>(
        'http://localhost:3000/feed?_expand=author',
      );
      this.posts = posts;
      console.log('succes');
    } catch (error) {
      console.error(error);
      this.posts = [];
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
