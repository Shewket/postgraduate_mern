import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom';

export default function Post({_id, title, summary, cover, content, createdAt, author}) {
    return (
    <div className="flex">
      <div className="max-w-lg ml-48 mt-4 min-w-min">
        <div className='gird gird-cols-2 gap-5'>  
          <div>
            <Link to={`/post/${_id}`}>
              <img src={'http://localhost:4000/'+cover} alt="" />
            </Link>
          </div>
          <div>
            <Link to={`/post/${_id}`}>
              <h2 className='text-2xl font-bold'>{title}</h2>
            </Link>
            <p className='text-stone-400 flex gap-2'>
              <a>{author.name}</a>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </div>
    )
}