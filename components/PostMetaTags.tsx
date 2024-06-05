import Head from 'next/head';

type PostMetaTagsProps = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
};

const PostMetaTags = ({ title, description, imageUrl, url }: PostMetaTagsProps) => (
  <Head>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
);

export default PostMetaTags;