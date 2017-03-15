.PHONY: clean

texthings.zip: clean
	zip $@ -r * -x Makefile

clean:
	rm -rfv texthings.zip
