import SearchBlock from './blocks/SearchBlock';

// Maps Sanity page-builder block `_type`s to the components that draw them.
// Add new blocks here as you create them (e.g. formBlock: FormBlock).
const BLOCKS = {
  searchBlock: SearchBlock,
};

export default function PageBuilder({ blocks, pagePath, query = '' }) {
  if (!blocks?.length) return null;

  return blocks.map((block) => {
    const Block = BLOCKS[block._type];
    if (!Block) {
      if (process.env.NODE_ENV !== 'production') {
        return (
          <div key={block._key} className="notice block">
            No component for the <code>{block._type}</code> block yet. Add one in components/PageBuilder.js.
          </div>
        );
      }
      return null;
    }
    return <Block key={block._key} block={block} pagePath={pagePath} query={query} />;
  });
}
