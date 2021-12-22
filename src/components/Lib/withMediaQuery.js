import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';

// Learned from the following stackoverflow.
// https://stackoverflow.com/questions/59672212/how-to-use-usemediaquery-in-class-component

const withMediaQuery = (queries = []) => Component => props => {
  const mediaProps = {}
  queries.forEach(q => {
    mediaProps[q[0]] = useMediaQuery(q[1])
    console.log(q)
  })
  console.log(mediaProps)
  return <Component {...mediaProps} {...props} />
}

export default withMediaQuery;
