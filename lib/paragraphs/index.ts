// Paragraph component registry — import each component's register.tsx here.
// Adding a new paragraph component:
//   1. Create your component in components/paragraphs/YourComponent/
//   2. Add a register.tsx in that folder
//   3. Add ONE import line below
//   4. Done — ParagraphResolver and includes auto-update

import '@/components/paragraphs/FeatureStack/register';
import '@/components/paragraphs/FAQs/register';
import '@/components/paragraphs/SimpleMedia/register';
import '@/components/paragraphs/Fact/register';
import '@/components/paragraphs/DescriptiveMedia/register';
import '@/components/paragraphs/ArtisticCarousel/register';

// Future components — just uncomment or add:
// import '@/components/paragraphs/Hero/register';
// import '@/components/paragraphs/PageBreaker/register';
// import '@/components/paragraphs/CardGrid/register';
