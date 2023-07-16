import React from "react";
import ProfileCont from "../components/profile/ProfileCont";
import PropTypes from "prop-types";
import Seo from "@components/Seo";
import Layout from "@layout";
import { normalizedData } from "@utils/functions";
import { graphql } from "gatsby";
import PageBreadcrumb from "../components/pagebreadcrumb";

const PrivacyPage = ({ data, location, pageContext }) => {
  const { slug } = pageContext;
  console.log(data, "data", pageContext, slug);
  const globalContent = normalizedData(data?.allGeneral?.nodes || []);
  return (
    <Layout
      data={{
        ...globalContent["menu"],
        ...globalContent["footer"],
      }}
    >
      <Seo title="Privacy Policy Page" pathname="/" />
      <PageBreadcrumb
        pageContext={pageContext}
        location={location}
        title="Profile"
      />
      <ProfileCont />
    </Layout>
  );
};

PrivacyPage.propTypes = {
  location: PropTypes.object,
  pageContext: PropTypes.object,
  data: PropTypes.shape({
    allGeneral: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};
export const query = graphql`
  query privacyPageQuery {
    allGeneral {
      nodes {
        section
        id
        menu {
          ...Menu
        }
        footer {
          ...Footer
        }
      }
    }
  }
`;

export default PrivacyPage;
