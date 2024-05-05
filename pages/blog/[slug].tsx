import * as React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import html from 'remark-html';
import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Flex,
  Tag,
  useColorModeValue,
  Image,
  AspectRatio,
  Skeleton
} from '@chakra-ui/react';
import { remark } from 'remark';
import prism from 'remark-prism';
import { getTagColor } from '../../components/theme';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { BlogPost } from '../../interfaces/interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import PageLayout from 'components/layouts/pageLayout';
import { MotionBox } from 'components/shared/animations/motion';
import { fadeInUp, stagger } from 'components/shared/animations/page-transitions';
import { motion } from 'framer-motion';
import { CommentIcon } from 'components/shared/icons';
import DisplayText from 'components/shared/icons/DisplayText';

dayjs.extend(localizedFormat);

export interface AllBlogProps {
  blogDetails: BlogPost;
  articleContent: string;
}


const ArticlePage: NextPage<AllBlogProps> = ({ articleContent, blogDetails }) => {
  
  const borderColor = useColorModeValue('transparent', 'gray.700');

  return (
    <PageLayout
      title={blogDetails?.title}
      description={blogDetails?.description}
      image={blogDetails?.cover_image}
      keywords={blogDetails?.tags.join(', ')}
    >
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <VStack marginBottom="5" alignItems="left" textAlign="left">
          {blogDetails?.cover_image && (
            <MotionBox whileHover={{ scale: 1.02 }}>
              <AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
                <Image
                  src={blogDetails?.cover_image}
                  fallback={<Skeleton />}
                  width={'full'}
                  height={'full'}
                  position="absolute"
                  border="2px solid"
                  borderColor={borderColor}
                  rounded="xl"
                  objectFit="cover"
                />
              </AspectRatio>
              <Box
                width={'full'}
                height={'full'}
                bg={useColorModeValue('gray.100', 'gray.900')}
                opacity={useColorModeValue('0.5', '1')}
              ></Box>
            </MotionBox>
          )}
          <motion.div variants={fadeInUp}>
            <Heading as="h1" size="xl" mt="2" mb="2">
              {blogDetails?.title}
            </Heading>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <HStack
              justifyContent="space-between"
              isInline
              flexDirection={['column', 'row', 'row']}
            >
              <HStack spacing={1} alignItems="center">
                {blogDetails?.tags.map((tag) => (
                  <Tag size={'md'} padding="0 3px" key={tag} colorScheme={getTagColor(tag)}>
                    {tag}
                  </Tag>
                ))}
              </HStack>
              <HStack spacing={2} isInline pt={['0.5rem', '0', '0']}>
                {blogDetails?.comments_count ? (
                  <Flex alignItems="center">
                    <DisplayText isLoading={false} value={blogDetails.comments_count} />
                    &nbsp;
                    <CommentIcon />
                  </Flex>
                ) : (
                  ''
                )}
              </HStack>
            </HStack>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <HStack spacing={2} alignItems="left" justifyContent={['center', 'left', 'left']}>
              <Text fontSize="xs">Published on</Text>
              <Text fontSize="xs" fontWeight="bold">
                {dayjs(blogDetails?.published_at).format('LL')}
              </Text>
            </HStack>
          </motion.div>
        </VStack>
        <motion.div variants={fadeInUp}>
          <Box className="article">
            <div dangerouslySetInnerHTML={{ __html: articleContent }} />
          </Box>
        </motion.div>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <VStack mt={8} direction={'row'} spacing={6}>
          <Text fontSize="sm" fontWeight="600" onClick={scrollToTop} cursor={'pointer'}>
           BACK TO TOP ▲ 
          </Text>
        </VStack>
      </motion.div>
    </PageLayout>
  );
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};


const root = process.cwd();
export const getStaticPaths: GetStaticPaths = async () => {

  const localPaths = fs.readdirSync(path.join(root, 'data', 'posts')).map((p) => ({
    params: {
      slug: p.replace(/\.mdx/, '')
    }
  }));

  return {
    paths: [...localPaths],
    fallback: true
  };
};

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(prism).process(markdown);
  return result.toString();
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  let blogObj = null,
    remarkContent = null;

  const markdownWithMeta = fs.readFileSync(
      path.join(root, 'data', 'posts', `${params?.slug}.mdx`),
      'utf-8'
    );
    const { data: frontmatter, content } = matter(markdownWithMeta);

    blogObj = frontmatter;

    // If slug not existed in blogObj
    if (params?.slug) {
      blogObj.slug = params?.slug;
    }
    remarkContent = await markdownToHtml(content);

  return {
    props: {
      articleContent: remarkContent,
      blogDetails: blogObj
    },
    revalidate: 1
  };
};

export default ArticlePage;
