// pages/outlet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemColor: "#fccfd1",
    itemUrl1: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ2Mi4yNzggNDYyLjI3OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDYyLjI3OCA0NjIuMjc4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxwYXRoIGQ9Ik00NjAuODc3LDMzLjg3M2wtNC41NzgtMTUuNjk2Yy0xLjYyNi01LjU3NC01LjUyNC0xMC4yODYtMTAuNjk1LTEyLjkyNmMtNS4xNzItMi42NC0xMS4yNzUtMy4wMzUtMTYuNzQ0LTEuMDgyICBjLTcuMDE0LDIuNTA1LTEyLjI0OSw4LjYwNC0xMy42NjMsMTUuOTE4bC0yMi40NjIsMTE2LjI1NWwtMzguMDg2LTQzLjA4bDYuNTk1LTE3LjU4NGM0LjEzNi0xMS4wMjcsMy4zNDctMjMuMzIxLTIuMTY0LTMzLjczICBjLTUuMjMzLTkuODg3LTE1LjAyMS0xNi4yNDktMjYuMTgzLTE3LjAxOWwtMTcuMTctMS4xODRjLTkuODA2LTAuNjc5LTE5LjcyMSwxLjk1NS0yNy45MDQsNy40MTFsLTIyLjM4MywxNC45MjJsLTM3LjAxOC0xMi4zNCAgYy0yLjYxNi0wLjg3MS01LjQ5NS0wLjIzOS03LjUwNCwxLjY0NmMtMi4wMSwxLjg4Ni0yLjgyMyw0LjcyMS0yLjExOSw3LjM4NWwxNi41NjQsNjIuNzExYzMuMDg1LDExLjY3OCw3LjQ4NiwyMy4wMjcsMTMuMDgxLDMzLjczICBsMTMuNjQ2LDI2LjEwNWMtNjQuMTIzLDI4LjkyLTEwOC4xNTIsODkuNDM1LTExNS42NTMsMTU5LjgxOWwtMy4zMjMsMzEuMTg3Yy0wLjkxOSw4LjYyNC01LjIzOCwxNi4yNjEtMTIuMTYyLDIxLjUwMyAgYy02LjkzNyw1LjI1Mi0xNS43MjksNy42MTQtMjQuNzQ3LDYuNjQ2Yy0zOS4wMDQtNC4xNzktNTguODcyLTIzLjYxNi02My4yMzYtMzAuNzUzYy03LjYyMS0xMi40NjQtNC42NjMtMzMuOTgsOC4zMjktNjAuNTg1ICBjMTIuNDczLTI1LjUzOSwxMi40ODQtMzQuMjM5LDguNjY2LTM5LjQ0NmMtMi4yMzItMy4wNDQtNS45MzgtNC41MDUtOS45MTYtMy45MWMtOC4wMDYsMS4yMDItMTcuNTc1LDEwLjk5Ni0yNC4xOTMsMTkgIGMtOC45ODYsMTAuODctMTYuMjMyLDIzLjExNy0xOS44NzksMzMuNmMtNy4xNzcsMjAuNjM0LTcuOTAzLDQwLjg0MS0yLjEwMSw1OC40MzZjNy4wMTEsMjEuMjU3LDIzLjA3NSwzOC40OCw0Ny43NDgsNTEuMTkxICBjNTIuNzM5LDI3LjE2OCwxMDIuNjA0LDMwLjgzMSwxNDQuNDI4LDMwLjgzMWgyNi4wMzZjNi4xNDQsMTAuMDAxLDE3LjE2MywxNi40OTksMjkuNDc0LDE2LjQ5OWgxMDkuNDgxICBjMi40NDYsMCw0LjczOS0xLjE5Myw2LjE0My0zLjE5N2MxLjQwNC0yLjAwNCwxLjc0Mi00LjU2NiwwLjkwNi02Ljg2NmMtNC41NzMtMTIuNTc0LTE1LjEyMy0yMS43NzgtMjguMjIyLTI0LjYyMSAgYy0zMy4zMjktNy4yMzEtNDguOTY5LTEzLjc3OC01NC42NTgtMTcuNTczYzEzLjE3OC0xNi4xOTksMjAuOTA1LTM0LjEyMSwyMi42MjYtNTIuMTM0bDE2LjY3My0xNC4xNDJsNDAuMDU0LDk1Ljg0NSAgYzUuNzYxLDEzLjc4MiwxOS4xMzUsMjIuNjg4LDM0LjA3MiwyMi42ODhoMjYuOTAxYzQuMTQzLDAsNy41LTMuMzU4LDcuNS03LjVjMC0xOC4yOTItMTIuOTY3LTMzLjU3NC0zMC45MzQtMzYuNTkybC0xOS45MjMtMTI4LjA3NyAgYzMuNDgzLTEzLjcwMywxMS41MjktMjguODE1LDIzLjkzNC00NC45NDVjNi45NzktOS4wNzUsMTEuNTQ2LTE5LjM2MSwxMy43NjEtMzAuMDIzYzkuNDAzLTIuNDAyLDI2LjI2OC0xMC44ODgsMzIuNTAzLTQwLjgyICBjMC4xMTUtMC41NTYsMC4xNjgtMS4xMjIsMC4xNTUtMS42ODljLTEuMTgtNTUuNDgzLDYuMDM0LTEwMi4yMyw5LjE4OS0xMTkuNzUyQzQ2Mi42ODQsNDQuNjE5LDQ2Mi4zOSwzOS4wNjUsNDYwLjg3NywzMy44NzN6ICAgTTM5NC4yMjUsMjMzLjA3NmMtNC4xODgsNS40NDctNy45MjIsMTAuODE1LTExLjIxNiwxNi4wOTdsMC41MjktMjAuNjM2YzAuMTA2LTQuMTQxLTMuMTY0LTcuNTg0LTcuMzA1LTcuNjkgIGMtNC4xMDUtMC4wODgtNy41ODQsMy4xNjUtNy42ODksNy4zMDVjMCwwLTEuNDgxLDU5LjQxLTEuNDE0LDU5Ljg0MmwyMC45OTksMTM0Ljk5M2MwLjUwNCwzLjI0MSwzLjA1Niw1Ljc3OCw2LjI5OSw2LjI2NCAgbDQuNzgyLDAuNzE3YzguMzA5LDEuMjQ3LDE0Ljg4Myw2Ljg3NywxNy41NDUsMTQuMzY0aC0xOC4xMThjLTguODcsMC0xNi44MTItNS4yODgtMjAuMjMyLTEzLjQ3MmwtNzYuNDM5LTE4Mi45MSAgYy0xLjU5Ny0zLjgyMi01Ljk5Mi01LjYyNi05LjgxMi00LjAyOGMtMy44MjIsMS41OTctNS42MjYsNS45OS00LjAyOCw5LjgxMmwzMC4zMTYsNzIuNTQzbC0xMS4wODgsOS40MDUgIGMtMy4xNzctMjEuNDctMTQuOTUtMzkuOTQyLTMyLjM2LTUwLjcxOWMtMzUuMTMyLTIxLjc0OC04OC4yNzEsMTIuMTI2LTkwLjUxNywxMy41NzljLTMuNDc4LDIuMjUtNC40NzMsNi44OTQtMi4yMjMsMTAuMzcxICBjMi4yNTEsMy40NzksNi44OTYsNC40NzEsMTAuMzcxLDIuMjIzYzEzLjA3Ni04LjQ2MSw1MS45NDMtMjcuMzY1LDc0LjQ3NC0xMy40MTljMTMuNzI4LDguNDk4LDIzLjAxMiwyMy4yNTIsMjUuNDcyLDQwLjQ4ICBjMy4wNjEsMjEuNDMzLTQuOTY1LDQ0LjAyNi0yMi42LDYzLjYyYy0xLjU4NCwxLjc2LTIuMjQzLDQuMTY2LTEuNzc5LDYuNDg4YzEuNTYzLDcuODE3LDEwLjA5OSwxMy44NzgsMjguNTQsMjAuMjY5ICBjMTMuMTYyLDQuNTYxLDI4Ljk5NCw4LjM1NCwzOS45NTcsMTAuNzMzYzMuODY5LDAuODM5LDcuMzc1LDIuNTgzLDEwLjI4Myw1LjAyNWgtOTUuNDExYy05LjQzMywwLTE3LjUzMS02LjczLTE5LjI1Ny0xNi4wMDQgIGwtNy44ODItNDIuMzY0Yy0wLjc1Ny00LjA3Mi00LjY3LTYuNzU2LTguNzQ1LTYuMDAxYy00LjA3MiwwLjc1OC02Ljc1OSw0LjY3My02LjAwMSw4Ljc0Nmw3LjI3OSwzOS4xMjVoLTIwLjkwNSAgYy00Mi4wMzksMC04Ny44MDEtMy41MzMtMTM3LjU1OS0yOS4xNjZjLTIxLjA1NC0xMC44NDYtMzQuNjM3LTI1LjE2My00MC4zNzItNDIuNTU0Yy00Ljc2MS0xNC40MzctNC4wNjItMzEuMzE1LDIuMDIzLTQ4LjgxICBjNS4wNjktMTQuNTc1LDE2LjY3Mi0yOS4zODEsMjQuODEyLTM3LjE4NGMtMS4zNzIsMy44MzUtMy41ODIsOS4xNTQtNy4xMzYsMTYuNDNjLTEwLjgzOCwyMi4xOTItMjAuOTYzLDUzLjIxNy03LjY0Nyw3NC45OTIgIGM2Ljc2LDExLjA1NSwzMS4wMTcsMzMuMTksNzQuNDM2LDM3Ljg0M2MxMi44MywxLjM3MywyNS40MDQtMi4wMzYsMzUuMzk5LTkuNjAyYzEwLjI2LTcuNzY4LDE2LjY2MS0xOS4wODgsMTguMDIzLTMxLjg3MyAgbDMuMzIzLTMxLjE4N2M2Ljk2NC02NS4zNTIsNDcuOTk2LTEyMS40OTksMTA3LjY5OC0xNDguMDkybDUuODQ5LDExLjE4OGMxLjkxOSwzLjY3MSw2LjQ1Miw1LjA5MiwxMC4xMjEsMy4xNzIgIGMzLjY3MS0xLjkxOSw1LjA5MS02LjQ1LDMuMTcyLTEwLjEyMWwtMjYuNDU2LTUwLjYxYy01LjA3Ny05LjcxNC05LjA3MS0yMC4wMTQtMTEuODcyLTMwLjYxM2wtMTMuMDItNDkuMjkxbDI3LjMzLDkuMTEgIGMyLjE5NCwwLjczMSw0LjYwNSwwLjQwOSw2LjUzMi0wLjg3NWwyNS40MzUtMTYuOTU3YzUuNDQtMy42MjcsMTIuMDItNS4zNzUsMTguNTUzLTQuOTI3bDE3LjE3LDEuMTg0ICBjNS45NDksMC40MSwxMS4xNjcsMy44MDIsMTMuOTU3LDkuMDcyYzMuNTA0LDYuNjE4LDQuMDA1LDE0LjQzNSwxLjM3NiwyMS40NDVMMzQ0LjI0LDc4LjNjLTIuMzA1LDYuMTI5LTcuNzM3LDEwLjY2My0xNC4xODIsMTEuODM1ICBsLTM0Ljg1NCw2LjMzN2MtNC4wNzUsMC43NDEtNi43NzgsNC42NDYtNi4wMzcsOC43MjFjMC42NTgsMy42MjIsMy44MTUsNi4xNiw3LjM3LDYuMTZjMC40NDUsMCwwLjg5Ny0wLjA0LDEuMzUxLTAuMTIzICBsMzQuODU0LTYuMzM3YzMuMjkxLTAuNTk4LDYuNDI3LTEuNjk5LDkuMzM4LTMuMTk5bDQ5LjUwOSw1Ni4wMDFDNDEwLjM3LDE3OC45MzgsNDExLjQ3OCwyMTAuNjQsMzk0LjIyNSwyMzMuMDc2eiBNNDQ2Ljk2NCw0Ny4yNzYgIGMtMy4yMiwxNy44NzUtMTAuNTU3LDY1LjQtOS40NDIsMTIxLjg1NWMtMy41MDQsMTUuOTU0LTEwLjUyNCwyMy4xMzMtMTYuMTAyLDI2LjM2NmMtMC4zMjctMTUuOTQzLTUuNzQzLTMxLjc3MS0xNi4xNzItNDQuODQ0ICBsMjQuNjc2LTEyNy43MTljMC40MTItMi4xMzEsMS45MzgtMy45MDgsMy45OC00LjYzOGMxLjYxNy0wLjU3NywzLjM1MS0wLjQ2NSw0Ljg3OSwwLjMxNWMxLjUyOCwwLjc4LDIuNjM1LDIuMTE4LDMuMTE1LDMuNzY2ICBsNC41NzgsMTUuNjk2QzQ0Ny4zNDQsNDEuMDQ4LDQ0Ny41MTIsNDQuMjMsNDQ2Ljk2NCw0Ny4yNzZ6IiBmaWxsPSIjRkZGRkZGIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
    itemUrl2: "data:image/svg+xml;utf8;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMS45OTYgNTExLjk5NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjk5NiA1MTEuOTk2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTE5MS45OTgsMzY3Ljk5NmMtMi4yMTEsMC00LDEuNzg5LTQsNGMwLDYuNDIyLTIuMjk3LDEyLjIzNS03LjAzMSwxNy43NjdjLTEuNDM3LDEuNjc5LTEuMjQyLDQuMjAyLDAuNDM4LDUuNjQgICAgYzAuNzU4LDAuNjQ5LDEuNjgsMC45NjEsMi42MDIsMC45NjFjMS4xMjUsMCwyLjI1LTAuNDc2LDMuMDM3LTEuMzk5YzUuOTM3LTYuOTUzLDguOTU0LTE0LjY4LDguOTU0LTIyLjk2OSAgICBDMTk1Ljk5OCwzNjkuNzg1LDE5NC4yMDksMzY3Ljk5NiwxOTEuOTk4LDM2Ny45OTZ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzI4LjEzMSwzODUuODY2Yy0yLjc4LTQuMzkxLTQuMTMzLTguOTMtNC4xMzMtMTMuODY4YzAtMi4yMTEtMS43OS00LTQtNGMtMi4yMSwwLTQsMS43ODktNCw0ICAgIGMwLDYuNDE0LDEuODE0LDEyLjUxNSw1LjM4MywxOC4xNDhjMC43NTgsMS4yMDMsMi4wNTUsMS44NTksMy4zNzYsMS44NTljMC43MzMsMCwxLjQ3NS0wLjIwMiwyLjE0MS0wLjYyNCAgICBDMzI4Ljc2NCwzOTAuMjAxLDMyOS4zMTksMzg3LjczMiwzMjguMTMxLDM4NS44NjZ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTc5LjE3OCwzOTcuMzg3Yy0xLjM1MS0xLjc1Ny0zLjg2Ny0yLjA3OC01LjYwOS0wLjczNGMtMTQuMzkxLDExLjA1My0zNi4zNTIsMTguMTcxLTU0LjAwOCwyMy44OTggICAgYy01LjYzOSwxLjgyOC0xMC43OTYsMy41LTE1LjA2Miw1LjA5NGMtMjguODU4LDEwLjc4Mi00NC41LDIyLjM2OC00NC41LDUyLjY0MXYyOS43MWMwLDIuMjExLDEuNzksNCw0LjAwMSw0ICAgIGMyLjIxLDAsNC0xLjc4OSw0LTQuMDAxdi0yOS43MWMwLTI1LjkwNywxMi42NzItMzUuMTk2LDM5LjI5Ni00NS4xNDJjNC4xNzItMS41NjIsOS4yMTEtMy4xOTQsMTQuNzM0LTQuOTg0ICAgIGMxOC4yMzQtNS45MTQsNDAuOTMtMTMuMjcyLDU2LjQxNC0yNS4xNjNDMTgwLjE5NCw0MDEuNjUyLDE4MC41MjEsMzk5LjEzNywxNzkuMTc4LDM5Ny4zODd6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDA3LjUyMSw0MjUuNjQ2Yy00LjI3NC0xLjU5NC05LjQzOS0zLjI3NC0xNS4wOTUtNS4xMDJjLTE5LjI2Ni02LjI0Mi00My4yNDItMTQuMDE3LTU3LjMwNC0yNi42MjUgICAgYy0xLjY0LTEuNDY4LTQuMTcxLTEuMzUxLTUuNjQ4LDAuMzA0Yy0xLjQ3NiwxLjY0OS0xLjMzNyw0LjE3MiwwLjMwNSw1LjY1YzE1LjMyNywxMy43NCw0MC4xOTYsMjEuODAyLDYwLjE4LDI4LjI3OSAgICBjNS41MzIsMS43OSwxMC41ODUsMy40MywxNC43NjUsNC45OTJjMjYuNjA5LDkuOTQ3LDM5LjI3MywxOS4yMzYsMzkuMjczLDQ1LjE0MnYyOS43MWMwLDIuMjExLDEuNzksNCw0LDQgICAgYzIuMjExLDAsNC0xLjc4OSw0LTMuOTk5di0yOS43MUM0NTEuOTk3LDQ0OC4wMTMsNDM2LjM2NCw0MzYuNDM1LDQwNy41MjEsNDI1LjY0NnoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0xOTEuOTk5LDM1MS43NzFjLTIuMjExLDAtNCwxLjc4OC00LDMuOTk5djE2LjIyN2MwLDIuMjExLDEuNzg5LDQsNCw0czQtMS43ODksNC00VjM1NS43NyAgICBDMTk1Ljk5OSwzNTMuNTU5LDE5NC4yMSwzNTEuNzcxLDE5MS45OTksMzUxLjc3MXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zMTkuOTk4LDM1MS42NDVjLTIuMjEsMC00LDEuNzktNCw0djE2LjM1MmMwLDIuMjExLDEuNzksNCw0LDRjMi4yMSwwLDQtMS43ODksNC00di0xNi4zNTIgICAgQzMyMy45OTgsMzUzLjQzNSwzMjIuMjA4LDM1MS42NDUsMzE5Ljk5OCwzNTEuNjQ1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM0MC4wOSwxMzcuMTMxYy0xLjU4NS0xLjUzMS00LjExNi0xLjQ2OC01LjY1NSwwLjEyNWMtMS41MjMsMS41OTQtMS40NjksNC4xMjYsMC4xMjUsNS42NTcgICAgYzI0LjE0LDIzLjEwOSwzNy40MzcsNTYuNzk2LDM3LjQzNyw5NC44NDNjMCw3NS40MDUtNzIuMzY2LDE0Ni4yNDEtMTE1Ljk5OSwxNDYuMjQxYy0zOC4zMTIsMC05Ny43NTctNTMuOTUzLTExMi41MjItMTE2LjkyMSAgICBjLTAuNS0yLjE1LTIuNjI1LTMuNTMyLTQuODA1LTIuOTc3Yy0yLjE0OSwwLjUtMy40ODUsMi42NTctMi45NzcsNC44MDVjMTUuOTg1LDY4LjE4Nyw3OC44ODIsMTIzLjA5MywxMjAuMzA0LDEyMy4wOTMgICAgYzQ2LjcxOSwwLDEyNC03Mi4wOTMsMTI0LTE1NC4yNDFDMzc5Ljk5OCwxOTcuNTA2LDM2NS44MjYsMTYxLjc2NSwzNDAuMDksMTM3LjEzMXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zNjkuMjU2LDEyOC42ODZjLTEuODM2LTEuMjE4LTQuMjg5LTAuNzU3LTUuNTM5LDEuMDU1Yy0xLjI0MywxLjgxMy0wLjc4Miw0LjI5NywxLjAyMyw1LjU1NSAgICBjMS4zNDMsMC45MzgsMzIuNjk1LDIzLjY1NiwxNS4xMDIsOTEuNzFjLTAuNTQ3LDIuMTQsMC43MzMsNC4zMiwyLjg3NCw0Ljg3NWMwLjMzNywwLjA4NiwwLjY3MiwwLjEyNSwxLDAuMTI1ICAgIGMxLjc4MSwwLDMuNDA2LTEuMTk2LDMuODc1LTMuMDAxQzQwNi42OTMsMTU1LjEyNCwzNzAuNzk1LDEyOS43MzMsMzY5LjI1NiwxMjguNjg2eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM3Mi41NTEsNDYuNzgxQzM1NS42NDYsMTcuNDg0LDMzMS40NzQsMCwzMDcuNzMxLDBDMjIwLjgxOCwwLjI4OSwxNjEuMDkyLDI0LjE0LDEzMC4yMSw3MC44ODMgICAgYy01MC44NTEsNzYuOTY4LTUuMzk5LDE4Ni44MzQtMy40MzgsMTkxLjQ3NWMwLjY0MSwxLjUwNywyLjExLDIuNDQ1LDMuNjg4LDIuNDQ1YzAuMzEyLDAsMC42MjUtMC4wMzgsMC45NDMtMC4xMDkgICAgYzEuOTA2LTAuNDY4LDMuMTk1LTIuMjQyLDMuMDQ3LTQuMTk1Yy0wLjAzMS0wLjM4NC0yLjU1NC0zOC43OTcsMjkuOTc3LTczLjkwNmMzNi4wNTQtMzguOTEzLDk5LjMxMi01OC42NCwxODguMDA4LTU4LjY0ICAgIGMyLjQ3NiwwLDQuOTc2LDAuMDE2LDguMDA3LDAuMDQ3YzAsMCwwLDAsMC4wMDgsMGMxMy4xOTUsMCwxOS43ODktNi42MjYsMjMuMDA3LTEyLjE4OCAgICBDMzkyLjExMywxMDAuODExLDM4Ny43MzEsNzMuMDcsMzcyLjU1MSw0Ni43ODF6IE0zNzYuNTMsMTExLjgxMWMtMy4xODgsNS41MDgtOC40MzgsOC4xODctMTYuNDcsOC4xODdjMCwwLTAuMDA4LDAtMC4wMTYsMCAgICBjLTIuNTYxLTAuMDMxLTUuMS0wLjA0Ni03LjYwNy0wLjA0NmMtOTEuMDE2LDAtMTU2LjI0MiwyMC41OTMtMTkzLjg3NSw2MS4yMDNjLTIwLjI2NiwyMS44NzQtMjcuODYsNDQuNzQyLTMwLjY0MSw2MC4zOTcgICAgYy0xMC42NC0zNC4xMjQtMjcuODM2LTExMC41NTMsOC45NjktMTY2LjI2NEMxNjYuMjAyLDMwLjkyMSwyMjMuNjk0LDguMjgxLDMwNy44OTYsOGMyMC42ODgsMCw0Mi4yNjYsMTUuOTkyLDU3LjcyNyw0Mi43OCAgICBDMzc5LjIwOSw3NC4zMDMsMzgzLjY5Myw5OS40MDUsMzc2LjUzLDExMS44MTF6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzM0Ljc0LDM5My42MjFjLTEuODEyLTEuMjQ4LTQuMzEyLTAuODE5LTUuNTYyLDEuMDE2Yy0wLjUyNCwwLjc1MS01My4yMDIsNzUuMzY3LTE3MC4yOTYsMTA5LjUxNSAgICBjLTIuMTI1LDAuNjI2LTMuMzQ0LDIuODQ0LTIuNzI3LDQuOTYxYzAuNTE2LDEuNzUsMi4xMSwyLjg4MywzLjg0NCwyLjg4M2MwLjM2NywwLDAuNzUtMC4wNTUsMS4xMTctMC4xNTcgICAgYzExOS45NzYtMzQuOTk5LDE3NC4xMDgtMTExLjg4MSwxNzQuNjQtMTEyLjY1NUMzMzcuMDEzLDM5Ny4zNjQsMzM2LjU1MiwzOTQuODcyLDMzNC43NCwzOTMuNjIxeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI0OS4wMTMsNDQ4LjEyOWMtNDMuNjQ4LTExLjQ1Mi02OS40MTMtNTAuMTE2LTY5LjY3MS01MC41MDdjLTEuMjE5LTEuODYtMy43MTEtMi4zNjgtNS41MzItMS4xNTYgICAgYy0xLjg1MSwxLjIwMy0yLjM2NiwzLjY3OS0xLjE2Myw1LjUzMWMxLjEwOCwxLjY5NSwyNy42MzIsNDEuNjE3LDc0LjMzNSw1My44NjdjMC4zNDQsMC4wOTQsMC42ODEsMC4xMzMsMS4wMTcsMC4xMzMgICAgYzEuNzcyLDAsMy4zOTctMS4xODcsMy44NjYtMi45ODVDMjUyLjQyNyw0NTAuODcyLDI1MS4xNDYsNDQ4LjY4NCwyNDkuMDEzLDQ0OC4xMjl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDQ3Ljk5Nyw1MDMuOTk2SDE1OS45OTljLTIuMjExLDAtNCwxLjc5LTQsNGMwLDIuMjExLDEuNzg5LDQsNCw0aDI4Ny45OThjMi4yMTEsMCw0LTEuNzg5LDQtNCAgICBDNDUxLjk5Nyw1MDUuNzg2LDQ1MC4yMDgsNTAzLjk5Niw0NDcuOTk3LDUwMy45OTZ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTQzLjk5OSw1MDMuOTk2SDY0Yy0yLjIxMSwwLTQuMDAxLDEuNzktNC4wMDEsNGMwLDIuMjExLDEuNzksNCw0LjAwMSw0aDc5Ljk5OWMyLjIxMSwwLDQtMS43ODksNC00ICAgIEMxNDcuOTk5LDUwNS43ODYsMTQ2LjIxLDUwMy45OTYsMTQzLjk5OSw1MDMuOTk2eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
    longitude: "106.5977550000",
    latitude: "29.7145810000",
    markers: [{
      iconPath: "./marker.png",
      id: 0,
      latitude: 29.7145810000,
      longitude: 106.5977550000,
      width: 15,
      height: 20
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  goToDate() {
    wx.navigateTo({
      url: '/pages/date-list/index',
    })
  }
})