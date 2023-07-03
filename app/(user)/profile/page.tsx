import { cookies } from "next/headers"
import Link from "next/link"
import { ValidUntil } from "../../../components/ValidUntil/ValidUntil"
import { getBinsByUser } from "../../../lib/fauna"
import { Bin } from "../../../models/bin.model"
import { getNextAuthSessionCookie } from "../../../lib/cookie"

export default async function Profile() {
  const cookieStore = cookies()
  const session_token = getNextAuthSessionCookie(cookieStore)
  let bins: Bin[] = []

  if (session_token) {
    bins = await getBinsByUser(session_token)
  }

  return (
    <div>
      <h1 className="mb-6 block text-left text-2xl">My Bin&apos;s</h1>
      <div className="flex flex-col gap-2">
        {bins.length > 0 &&
          bins.map((bin) => (
            <div
              className="flex flex-col items-center border-b-[1px] border-gray-300 text-sm first-of-type:border-t-[1px]"
              key={bin.hashed_id}
            >
              <div className="mt-2 flex w-full items-center gap-1">
                <div>
                  <Link className="font-bold text-blue-700" href={`/b/${bin.hashed_id}`}>
                    {bin.title} [{bin.hashed_id}]
                  </Link>
                </div>
                <div className="flex flex-1"></div>
                {bin.readOnce && (
                  <div title="destroys after read">
                    <svg
                      className="text-black"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
                {bin.isProtected && (
                  <div title="protected">
                    <svg
                      className="text-black"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
              <div className="w-full">
                <ValidUntil className="m-0 mb-2 h-5 text-sm" validUntil={bin.lifetime} />
              </div>
            </div>
          ))}
        {bins.length === 0 && (
          <div className="flex w-full items-center gap-2">
            <p>Currently no created bin&apos;s... </p>
            <Link className="font-bold text-blue-700" href="/">
              create one
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
