"use client"

import Section from "./components/section"

export default function Error() {
  return (
    <Section>
      <div>
        <h1 className="text-3xl text-red-700">Error</h1>
        <p className="my-4">Uups... Pls try again...</p>
      </div>
    </Section>
  )
}
