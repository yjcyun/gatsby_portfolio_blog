import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import PortfolioCard from './PortfolioCard'

export const query = graphql`
  {
    allProjectsJson {
      nodes {
        featured
        github
        id
        link
        name
        desc
        stacks
        thumbnail {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const Portfolio = () => {

  const { allProjectsJson: { nodes } } = useStaticQuery(query);

  return (
    <PortfolioWrapper className='p-1'>
      <h1 className='page-title'>Portfolio</h1>
      <h2>Highlights</h2>
      <PortfolioGrid className='text'>
        {nodes
          .filter(el => el.featured)
          .map((el, index) => (
            <div className='grid-container' key={index}>
              <PortfolioCard data={el} />
            </div>
          ))}
      </PortfolioGrid>
      <h2>Personal Projects</h2>
      <PortfolioGrid className='text'>
        {nodes
          .filter(el => el.featured === false)
          .map((el, index) => (
            <div className='grid-container' key={index}>
              <PortfolioCard data={el} />
            </div>
          ))}
      </PortfolioGrid>
    </PortfolioWrapper>
  )
}

const PortfolioWrapper = styled.section`
  h2 {
    margin: 2rem 0;
    box-shadow: rgba(42, 192, 110, 1) 0px -5px inset;
    display: inline-block;
  }
`

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-column-gap: 2rem;

  .grid-container {
    margin-bottom: 3rem;
    border-radius: 5px;
    box-shadow:0 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.15);
  }
`

export default Portfolio