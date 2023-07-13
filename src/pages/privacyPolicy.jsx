import React, { useEffect, useState, Suspense } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import PageBreadcrumb from "../components/pagebreadcrumb";
import { normalizedData } from "@utils/functions";
import { graphql } from 'gatsby'
import WeaponDetails  from "../container/weapons/weaponDetail"

const PrivacyPage = ({ data, location, pageContext, weapon }) => {
    const { slug } = pageContext;
    console.log(data,"data",pageContext,slug)
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);



    return (
        <Layout
            data={{
                ...globalContent["menu"],
                ...globalContent["footer"],
            }} 
        >
            <SEO title="Privacy Policy Page" pathname="/" />
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title={weapon}
            />
            
            
          
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
