import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const MetaTagsFragmentDoc = gql`
  fragment MetaTags on Metatag {
    tagName
    attributes
    rel
    name
    content
    property
  }
`;

const ArticleTeaserFragmentDoc = gql`
  fragment ArticleTeaser on Article {
    id
    title
    path
    targetGroup
    benefit
    isLiked
    image {
      alt
      styles {
        style_12_12_md
        style_12_12_sm
        style_lazy
      }
    }
    campaign
    partner {
      id
      name
      icon
      url
    }
  }
`;

export const GetHomeDocument = gql`
  query GetHome($target: String!) {
    home(target: $target) {
      id
      title
      intro
      metatags {
        ...MetaTags
      }
      components {
        __typename
        ... on Banner {
          product
          text
          backgroundColor
          ctaColor
          image {
            styles {
              style_12_12_sm
            }
          }
          linkTitle
          linkHref
        }
        ... on EventSlider {
          title
          type
        }
        ... on Spotlight {
          intro
          title
          type
          path
          contentTitle
          ctaText
          image {
            styles {
              style_12_12_xl
              style_12_12_lg
              style_12_12_md
              style_12_12_sm
              style_lazy
            }
            alt
          }
          campaign
          partner {
            name
            icon
            url
          }
        }
        ... on SeriesSlider {
          id
          typeName
          seriesId
          title
        }
        ... on AutomatedContentList {
          id
          typeName
          title
          type
        }
        ... on ContentSlider {
          id
          typeName
          title
          items {
            ...ArticleTeaser
          }
        }
        ... on Embed {
          id
          typeName
          title
          code
        }
        ... on Hero {
          ctaTitle
          ctaHref
          scrollButton
          heroText
          backgroundVideo
          logo
        }
      }
      cover {
        alt
        caption
        styles {
          style_12_12_xl
          style_lazy
          style_header_xl
          style_header_md
          style_header_xs
          style_header_sm
        }
      }
    }
  }
  ${MetaTagsFragmentDoc}
  ${ArticleTeaserFragmentDoc}
`;

export const useGetHomeQuery = () => useQuery(GetHomeDocument);
