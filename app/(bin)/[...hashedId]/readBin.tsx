"use client"

import {FormEvent, useState} from "react"
import { Bin } from "../../../models/bin.model"
import { Input } from "../../../components/Input/Input"
import { Button } from "../../../components/Button/Button"
import { decryptText, generateHashedPassword } from "../../../lib/crypto"
import { useBin, useBinActions } from "../../../store/bin.store"
import Textarea from "../../../components/Textarea/Textarea"
import InputLabel from "../../../components/InputLabel/InputLabel"
import { ValidUntil } from "../../../components/ValidUntil/ValidUntil"

type ReadBinProps = {
  bin: Bin
}

export default function ReadBin({ bin }: ReadBinProps) {
  const cachedBin = useBin()
  const { addBin } = useBinActions()

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { password }: any = e.target

    if (password.value === "") return

    const response = await fetch(`/api/bin/${bin.hashed_id}?p=${generateHashedPassword(password.value)}`)

    const data = (await response.json()) as Bin

    addBin(data)
  }

  if (!cachedBin?.hashed_id && bin.isProtected)
    return (
      <form onSubmit={handleOnSubmit}>
        <InputLabel label="Password" className="my-4">
          <Input name="password" type="password" className="block w-full" placeholder="Password" />
        </InputLabel>
        <div className="my-6">
          <Button type="submit" intent="primary" size="lg">
            Read
          </Button>
        </div>
      </form>
    )
  else {
    return (
      <>
        <InputLabel label="Secret Text" className="my-3">
          <Textarea
            name="text"
            rows={6}
            className="block w-full"
            value={decryptText(cachedBin?.text || bin.text)}
            canCopy={true}
            canView={true}
            readOnly={true}
          ></Textarea>
        </InputLabel>
        {
          !(cachedBin?.readOnce || bin.readOnce) && <ValidUntil validUntil={cachedBin?.lifetime || bin.lifetime} />
        }
        {
          (cachedBin?.readOnce || bin.readOnce) && <div>
          <p className="text-left font-bold">Attention: <span className="text-amber-700">at the time of reading the message is destroyed!</span></p>
          </div>
        }
      </>
    )
  }
}
