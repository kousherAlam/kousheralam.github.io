package main

import "syscall/js"

type CertAltType string

const (
	CertDNSAltType CertAltType = CertAltType("DNS")
	CertIPAltType  CertAltType = CertAltType("IP")
)

type CertAltName struct {
	Type string
}

type OneTierCertInfo struct {
	Org     string
	Name    string
	Period  int
	AltName []CertAltName
}

func Generate_one_tier_cetificate(data OneTierCertInfo) {

}

func export_wasm_func() {
	js.Global().Set("generate", js.FuncOf(Generate_one_tier_cetificate(OneTierCertInfo{})))
}

func main() {
	infinity_chanel := make(chan int)
	export_wasm_func()
	<-infinity_chanel
}
