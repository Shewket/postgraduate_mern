import {formatISO9075} from 'date-fns';
export default function Post({title, summary, cover, content, createdAt, author}) {
    return (
    <div className="flex">
      <div className="max-w-lg ml-48 mt-4">
        <div>  
          <div>
            <img src={'http://localhost:4000/'+cover} alt="" />
          </div>
          <div>
            <h2>{title}</h2>
            <p className='flex gap-2'>
              <a className='font-bold'>{author.name}</a>
              <time className='text-stone-400'>{formatISO9075(new Date(createdAt))}</time>
            </p>
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </div>
    )
}