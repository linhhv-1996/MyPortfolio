import Home from 'components/home-page/home'
import { GetStaticProps, NextPage } from 'next'
import { BlogPostProps } from 'interfaces/interface'
import PageLayout from 'components/layouts/pageLayout'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Index: NextPage<BlogPostProps> = (props) => {
  const { posts } = props
  return (
    <PageLayout title="WordWhisperer - Full Stack Developer">
      <Home posts={posts} />
    </PageLayout>
  )
}

const root = process.cwd();

export const getStaticProps: GetStaticProps = async () => {
  const paths = fs.readdirSync(path.join(root, 'data', 'posts')).map((p) => p.replace(/\.mdx/, ''));
  const localPosts = [];
  paths.map((p) => {
    const markdownWithMeta = fs.readFileSync(path.join(root, 'data', 'posts', `${p}.mdx`), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    localPosts.push({
      slug: p,
      title: frontmatter.title,
      description: frontmatter.description,
      published_at: frontmatter.published_at,
      comments_count: 0,
      public_reactions_count: 0,
      tag_list: frontmatter.tags
    });
  });

  localPosts?.sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at));

  const posts = [...localPosts];

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: { posts },
    revalidate: 1,
  }
}

export default Index
