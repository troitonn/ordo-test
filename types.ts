
import React from 'react';

export interface ServiceBlock {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export interface Person {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}