"use client"

import { FormEvent } from "react"
import { Button } from "../../components/Button/Button"
import { Checkbox } from "../../components/Checkbox/Checkbox"
import { Input } from "../../components/Input/Input"
import { InputCopy } from "../../components/InputCopy/InputCopy"
import InputLabel from "../../components/InputLabel/InputLabel"
import { Select } from "../../components/Select/Select"
import Textarea from "../../components/Textarea/Textarea"
import { ValidUntil } from "../../components/ValidUntil/ValidUntil"
import { encryptText, generateHashedString } from "../../lib/crypto"
import { Bin } from "../../models/bin.model"
import { useBin, useBinActions } from "../../store/bin.store"

type CreateBinProps = {
  bin?: Bin
  isLoggedIn: boolean
}

export default function CreateBin({ isLoggedIn }: CreateBinProps) {
  const cachedBin = useBin()
  const { addBin } = useBinActions()

  const handleOnClick = () => {
    addBin(undefined)
  }

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { text, password, passwordConfirm, lifetime, readOnce, title }: any = e.target
    const { offset, unit }: any = JSON.parse(lifetime.value)

    if (password.value && password.value !== passwordConfirm.value) return
    if (!text.value) return

    const response = await fetch(`/api/bin/create`, {
      method: "POST",
      body: JSON.stringify({
        hashed_id: generateHashedString(Date.now().toString()).substr(0, 5),
        text: encryptText(text.value),
        hashed_password: !password.value ? null : generateHashedString(password.value),
        hashed_password_repeat: !passwordConfirm.value ? null : generateHashedString(passwordConfirm.value),
        readOnce: !!readOnce.checked,
        offset,
        unit,
        title: title.value ?? null,
      }),
    })

    const data = (await response.json()) as Bin

    addBin(data as Bin)
  }

  if (!cachedBin)
    return (
      <form onSubmit={handleOnSubmit}>
        <InputLabel label="Title" className="my-3">
          <Input name="title" type="text" className="block w-full" placeholder="Title" autoFocus={true} />
        </InputLabel>
        <InputLabel label="Secret Text" className="my-3">
          <Textarea name="text" rows={6} className="block w-full" placeholder="Secret Text"></Textarea>
        </InputLabel>
        <InputLabel label="Password" className="my-4">
          <Input name="password" type="password" className="block w-full" placeholder="Password" />
        </InputLabel>
        <InputLabel label="Repeat Password" className="my-4">
          <Input name="passwordConfirm" type="password" className="block w-full" placeholder="Repeat Password" />
        </InputLabel>
        <InputLabel label="Lifetime" className="m-auto my-3 w-fit">
          <Select name="lifetime" defaultValue="5 minutes">
            <>
              <option value={JSON.stringify({ offset: 1, unit: "minute" })}>1 minute</option>
              <option value={JSON.stringify({ offset: 5, unit: "minutes" })}>5 minutes</option>
              <option value={JSON.stringify({ offset: 30, unit: "minutes" })}>30 minutes</option>
              <option value={JSON.stringify({ offset: 1, unit: "hour" })}>1 hour</option>
              <option value={JSON.stringify({ offset: 2, unit: "hours" })}>2 hours</option>
              <option value={JSON.stringify({ offset: 1, unit: "half day" })}>half day</option>
              <option value={JSON.stringify({ offset: 1, unit: "day" })}>1 day</option>
              <option value={JSON.stringify({ offset: 3, unit: "days" })}>3 day</option>
              <option value={JSON.stringify({ offset: 7, unit: "days" })}>1 week</option>
              <option value={JSON.stringify({ offset: 30, unit: "days" })}>1 month</option>
              <option value={JSON.stringify({ offset: 365, unit: "days" })}>1 year</option>
              {isLoggedIn && <option value={JSON.stringify({ offset: 0, unit: "lifetime" })}>lifetime</option>}
            </>
          </Select>
        </InputLabel>
        <label htmlFor="readOnce">
          <Checkbox id="readOnce" name="readOnce" className="mx-3 px-3" />
          Destroy after reading
        </label>
        <div className="my-6">
          <Button type="submit" intent="primary" size="lg">
            Save
          </Button>
        </div>
      </form>
    )

  return (
    <>
      <InputCopy value={`${window!.location.origin}/${cachedBin.hashed_id}`} readonly={true} />
      {cachedBin.readOnce && (
        <p className="text-left font-bold">
          Attention: <span className="text-amber-700">this bin will self destory after reading once!</span>
        </p>
      )}
      <ValidUntil validUntil={cachedBin.lifetime} />
      <div className="my-6 flex">
        <Button size="sm" className="justify-start" onClick={handleOnClick}>
          Create new Bin
        </Button>
      </div>
    </>
  )
}
