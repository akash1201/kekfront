import React from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import { graphql } from "gatsby";
import { normalizedData } from "@utils/functions";
import PageBreadcrumb from "../components/pagebreadcrumb";
import ResetPassword from "../container/reset-password";
import PrivateRoute from "../container/private";

const ResetPasswordPage = ({ data, location, pageContext }) => {
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const content = normalizedData(data?.page?.content || []);
    return (
       <PrivateRoute>
           <Layout
            data={{
                ...globalContent["menu"],
                ...globalContent["footer"],
            }}
        >
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Reset Password"
            />
           <ResetPassword />
        </Layout>
       </PrivateRoute>
    );
};

ResetPasswordPage.propTypes = {
    location: PropTypes.object,
    pageContext: PropTypes.object,
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};

export const query = graphql`
    query resetPasswordPageQuery {
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
        page(title: { eq: "resetPasswordPage" }, pageType: { eq: innerpage }) {
          content {
              ...PageContentAll
          }
      }
    }
`;

export default ResetPasswordPage;
