import Form from '@/components/Form';
import Header from '../components/Header';
import PostFeed from '../components/posts/PostFeeds';

export default function Home() {
  return (
    <>
      <Header label="Home"/>
      <Form placeholder="Whats happening?"/>
      <PostFeed/>
    </>
  )
}
