import { useState } from 'react';
import {
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Heading,
  useColorModeValue,
  Text
} from '@chakra-ui/react';
import PostCard from 'components/blog/card';
import { PageSlideFade, StaggerChildren } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import { MotionBox } from 'components/shared/animations/motion';
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from 'components/layouts/pageLayout';
import { BiSearch } from 'react-icons/bi';

const TURQUOISE = '#06b6d4';

const Posts = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = posts.filter((data) => {
    const searchContent = data.title + data.description;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  filteredBlogPosts?.sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at));

  return (
    <>
      <PageLayout title="Blog" description="A list of all articles and posts!">
        <PageSlideFade>
          <Header underlineColor={TURQUOISE} mt={0} mb={6}>
            Blog
          </Header>
          <Text
              color={useColorModeValue('gray.500', 'gray.200')}
              textAlign="left"
              fontSize={16}
              marginBottom={2}
            >
              {filteredBlogPosts.length} posts so far. Stay tuned for more!
          </Text>

          <InputGroup maxW="30rem">
            <Input
              placeholder="Search articles"
              onChange={(e) => setSearchValue(e.target.value)}
              background={useColorModeValue('gray.100', '#1e2533')}
            />
            <InputRightElement>
              <Icon as={BiSearch} w={6} h={6} />
            </InputRightElement>
          </InputGroup>

          <StaggerChildren>
            <Stack spacing={4} mt={6}>
              <AnimatePresence>
                {!filteredBlogPosts.length && (
                  <Heading as="h1" pt={10} pb={10}>
                    No articles found
                  </Heading>
                )}
                {filteredBlogPosts.map((post, i) => (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: (i) => ({
                        opacity: 0,
                        y: -30 * i
                      }),
                      visible: (i) => ({
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: i * 0.1
                        }
                      })
                    }}
                    custom={i}
                    key={post.slug}
                  >
                    <MotionBox whileHover={{ y: -5 }} key={i}>
                      <PostCard
                        post={post}
                      />
                    </MotionBox>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Stack>
          </StaggerChildren>
        </PageSlideFade>
      </PageLayout>
    </>
  );
};

const root = process.cwd();

export const getServerSideProps: GetServerSideProps = async () => {

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

  const posts = [...localPosts];

  if (!posts) {
    return {
      notFound: true
    };
  }

  return {
    props: { posts }
  };
};

export default Posts;