export function Input({ placeholder, reference }: { placeholder: string, reference?: any}) {
    return <div>
        <input type={"text"} placeholder={placeholder} className="px-4 py-2 border rounded m-2" ref={reference} />
    </div>
}