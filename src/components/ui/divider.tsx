type DividerProp = {
    height: number
}

export function CurveDivider({ height }: DividerProp) {
    return (
        <div className={`custom-shape-divider-top-1755257848 h-[${height}px]`}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
            </svg>
        </div>
    )
}

export function LineDivider({ height }: DividerProp) {
    return (
        <div className={`custom-shape-divider-bottom-1755259837 h-[${height}px]`}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
            </svg>
        </div>
    )
}

export function CurveDividerFaq() {
    return (
        <div className="custom-shape-divider-top-1756200814">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
            </svg>
        </div>
    )
}

export function CurveDividerAbout() {
    return (
        <div className="custom-shape-divider-top-1756200815">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill-about"></path>
            </svg>
        </div>
    )
}