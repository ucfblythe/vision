from django.shortcuts import render

# Create your views here.

@api_view(['GET'])
def swanger(request):
  resutl = {'a': 1}
  resp = JsonResponse(resutl)
  resp['Access-Control-Allow-Origin'] = '*'
  return resp