+++
date = "2017-03-05T21:10:52+01:00"
type = "json"
url = "index.json"
+++

{{- $.Scratch.Add "index" slice -}}
{{- range where .Site.Pages "Type" "not in"  (slice "page" "json") -}}
{{- $.Scratch.Add "index" (dict "title" .Title "href" .Permalink "tags" .Params.tags "content" .Plain) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
