import React, { Component } from 'react';

import PhotoList from '../Album/Photolist';
import Albums from '../Album/Albums';

export default function Dashboard() {
  return(
    <div>
      <PhotoList />
      <Albums />
    </div>
  );
}