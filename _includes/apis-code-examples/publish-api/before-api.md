{% capture pre_content %}

{%comment%}
#### Developer Console
{: .aside .gray}

Make live API calls right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}
{%endcomment%}

## Overview
{: .article #overview }

### Authentication

To run a successful API call, you will need to pass your API Key as the query parameter  __apikey__.

Example: `https://app.ticketmaster.com/publish/v2/events?apikey={apikey}`

### Root URL

`https://app.ticketmaster.com/publish/{API version}`

{% endcapture %}

{{ pre_content | markdownify }}
