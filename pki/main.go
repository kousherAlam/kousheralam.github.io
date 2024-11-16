package main

func export_wasm_func() {

}

func main() {
	infinity_chanel := make(chan int)
	export_wasm_func()
	<-infinity_chanel
}
