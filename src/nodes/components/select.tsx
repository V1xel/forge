import { Form } from "react-bootstrap"

export interface ISelectProps {
    enumType: any
    onChange: (value: string) => void
}

export const Select = ({ enumType, onChange }: ISelectProps) => {
    const enumValues = Object.entries(enumType);
    return <Form.Select className="mb-1" onChange={(e) => { onChange(e.target.value) }}>
        {enumValues.map((ev) => <option key={ev[1] as string} value={ev[1] as string}>{ev[0]}</option>)}
    </Form.Select>
}
