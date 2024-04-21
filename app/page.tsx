export default function Home() {
  return (
    <main className='START_PAGE full flex-col-c gap-md'>
      <div className='BLURB_CONTAINER flex-col-c gap-md w-4/5 lg:w-2/3'>
        <h1 className='text-2xl lg:text-4xl font-bold text-center'>Visual Economy</h1>
        <p className='BLURB font-bold flex-col-c gap-md text-lg lg:text-xl text-center'>
          <span>
            Compare the economic performance and viability of up to 3 different
            states at a time and see how they stack up against each other.
          </span>
        </p>
      </div>
    </main>
  )
}
