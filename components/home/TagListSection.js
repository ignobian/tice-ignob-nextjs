import { TagBtn } from '../Button';
import Link from 'next/link';

const TagListSection = ({ tags }) => {

  console.log(tags);

  const listTags = () => (
    tags && tags.map((t, i) => (
      <div className="py-3 mx-1">
        <Link key={i} href={`/tags/${t.slug}`}>
          <TagBtn>{t.name}</TagBtn>
        </Link>
      </div>
    ))
  )

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center">
      {listTags()}
    </div>
  )
}

export default TagListSection;