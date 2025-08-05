export function Input({ placeholder, reference }: { placeholder: string, reference?: any}) {
    return <div>
        <input 
            type="text" 
            placeholder={placeholder} 
            className="px-4 py-2 border rounded m-2 transition-colors focus:outline-none focus:ring-2"
            style={{
                backgroundColor: 'var(--input)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                '--tw-ring-color': 'var(--ring)'
            } as React.CSSProperties}
            ref={reference} 
        />
    </div>
}