// Paragraph component registry — import each component's register.ts here.
// Adding a new paragraph component:
//   1. Create your component in components/paragraphs/YourComponent/
//   2. Add a register.ts in that folder
//   3. Add ONE import line below
//   4. Done — ParagraphResolver and includes auto-update

import '@/components/paragraphs/FeatureStack/register.tsx';
import '@/components/paragraphs/FAQs/register.tsx';
import '@/components/paragraphs/SimpleMedia/register.tsx';
import '@/components/paragraphs/Fact/register.tsx';
import '@/components/paragraphs/DescriptiveMedia/register.tsx';
import '@/components/paragraphs/ArtisticCarousel/register.tsx';

// Future components — just uncomment or add:
// import '@/components/paragraphs/Hero/register';
// import '@/components/paragraphs/PageBreaker/register';
// import '@/components/paragraphs/CardGrid/register';
