import React from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import { graphql, navigate } from "gatsby";
import { normalizedData } from "@utils/functions";
import PageBreadcrumb from "../components/pagebreadcrumb";
import ProfileCont from "../components/profile/ProfileCont";
import { useSelector } from "react-redux";

const Profile = ({ data, location, pageContext }) => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  if (!isLoggedIn) {
    return navigate("/");
  }

  const globalContent = normalizedData(data?.allGeneral?.nodes || []);
  const content = normalizedData(data?.page.content || []);
  return (
    <Layout
      data={{
        ...globalContent["menu"],
        ...globalContent["footer"],
      }}
    >
      <SEO title="Contact Us Page" pathname="/" />
      <PageBreadcrumb
        pageContext={pageContext}
        location={location}
        title="Profile"
      />
      <ProfileCont />
    </Layout>
  );
};

Profile.propTypes = {
  location: PropTypes.object,
  pageContext: PropTypes.object,
  data: PropTypes.shape({
    allGeneral: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    page: PropTypes.shape({
      content: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    allMatch: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

export const query = graphql`
  query profilePageQuery {
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
    page(title: { eq: "contactUsPage" }, pageType: { eq: innerpage }) {
      content {
        ...PageContentAll
      }
    }
  }
`;

export default Profile;
