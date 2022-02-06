package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

const FEATHER_URL = "https://feathericons.com"
const TOKEN = "" // github token

type Icon struct {
	Name string   `json:"name"`
	Tags []string `json:"tags"`
	Svg  string   `json:"svg"`
}

type Response struct {
	Svg  string
	Name string
}

const timeout time.Duration = 10 * time.Second

func main() {
	loadBootstrapIcons()
}

var client = &http.Client{}

func loadBootstrapIcons() {

	req, _ := http.NewRequest("GET", "https://api.github.com/repos/twbs/icons/contents/icons", nil)
	req.Header.Set("Authorization", fmt.Sprintf("token %s", TOKEN))
	resp, err := client.Do(req)

	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()

	if err != nil {
		log.Fatalln(err)
	}

	if err != nil {
		log.Fatalln(err)
	}

	var iconList []Icon

	if err := json.NewDecoder(resp.Body).Decode(&iconList); err != nil {
		log.Fatal("ooopsss! an error occurred, please try again", err)
	}

	ch := make(chan Response)

	go FetchIconsSvgCode(iconList[0:5], ch)

	var data []Icon

	for {
		select {
		case icon := <-ch:
			fmt.Println("Fetched", icon.Name)
			data = append(data, Icon{Svg: icon.Svg, Name: icon.Name})
		case <-time.After(timeout):
			file, _ := json.MarshalIndent(data, "", " ")
			_ = ioutil.WriteFile("test.json", file, 0644)
			os.Exit(1)
		}
	}

}

func FetchIconsSvgCode(icons []Icon, ch chan Response) {

	for _, icon := range icons {
		go func(name string) {
			req, _ := http.NewRequest("GET", "https://api.github.com/repos/twbs/icons/contents/icons/"+name, nil)

			req.Header.Set("Content-Type", "application/vnd.github.VERSION.raw")
			req.Header.Set("Accept", "application/vnd.github.VERSION.raw")
			req.Header.Set("Authorization", fmt.Sprintf("token %s", TOKEN))

			resp, err := client.Do(req)

			if err != nil {
				log.Fatalln(err)
			}
			defer resp.Body.Close()

			if err != nil {
				log.Fatalln(err)
			}

			data, err := ioutil.ReadAll(resp.Body)

			if err != nil {
				fmt.Errorf("Read body: %v", err)
			}

			ch <- Response{string(data), name}
		}(icon.Name)
	}

}
