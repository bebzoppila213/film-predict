

export type CustomInputType = {
    label: string,
    type: 'email' | 'password' | 'text',
    placeHolder: string,
    updateInputState: (text: string) => void
}

export default function CustomInput({label, type, placeHolder, updateInputState}:CustomInputType){

    return(
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">{label}</label>
        <input
        onInput={(event) => updateInputState(event.currentTarget.value)}
          type={type}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder={placeHolder}
        />
      </div>
    )
}