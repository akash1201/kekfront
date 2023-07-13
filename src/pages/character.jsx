import React, { useEffect, useState, Suspense } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import PageBreadcrumb from "../components/pagebreadcrumb";
import { normalizedData } from "@utils/functions";
import { graphql } from 'gatsby'
import CharacterDetail from "../container/characters/characterDetail";

const CharacterPage = ({ data, location, pageContext, weapon }) => {
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
            <SEO title="Games Page" pathname="/" />
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title={weapon}
            />

            <CharacterDetail characterid={slug}></CharacterDetail>
          
        </Layout>
    );
};

CharacterPage.propTypes = {
    location: PropTypes.object,
    pageContext: PropTypes.object,
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};
export const query = graphql`
  query characterPageQuery {
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


export default CharacterPage;
